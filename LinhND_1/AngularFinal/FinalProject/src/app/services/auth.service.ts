import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorMessage, SERVER_NO_AUTH_URL } from '../shared/basedUrls';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { LogInModel } from '../models/LogIn';

type UserObject = {
  accessToken: string,
  id: string,
  role: string,
}

type ResponseObject = {
  data: UserObject,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private errorMessages: Array<ErrorMessage> = new Array<ErrorMessage>();

  constructor(private router: Router, private httpClient: HttpClient) {

  }

  public logOut(): void {
    // Khi log out , đặt lại biến isLoggedIn và isAdmin là false
    // và xóa toàn bộ dữ liệu đăng nhập trong sessionStorage
    this.isLoggedIn.next(false);
    this.isAdmin.next(false);
    sessionStorage.setItem('role', '');
    sessionStorage.setItem('id', '');
    sessionStorage.setItem('accessToken', '');
  }

  // Observable là kiểu dữ liệu xử lí chuỗi sự kiện hoặc thay đổi dữ liệu
  // có thể xảy ra trong tương lai
  public isUserAdmin(): Observable<boolean> {

    // trang thái login in sẽ theo dõi sự thay đổi dữ liệu trong sessionStorage
    this.isLoggedIn.subscribe(state => {
      let isAdminFlag: boolean = false;
      let value: string | null = sessionStorage.getItem('role');

      // xử lí khi value trong sessionStorage không rỗng
      // thì xét giá trị của role có bắt đầu bằng ROLE_USER không
      // nếu không thì sẽ mặc định người dùng đăng nhập hiện tại là Admin
      if (value !== null) {
        let roles: string[] = value.split(',');
        if (roles[0] !== 'ROLE_USER') {
          isAdminFlag = true;
        }
      }
      // nếu vẫn ở trạng thái đăng nhập và có quyền Admin
      // thì cập nhật lại giá trị isAdmin là true cho tất cả các subcriber khác nhận vào
      if (state && isAdminFlag) {
        this.isAdmin.next(true);
      }
      else {
        this.isAdmin.next(false);
      }
    })
    return this.isAdmin.asObservable();
  }

  //hàm xử lí khi token hết hạn
  private isTokenExpired(token: string){
    // decrypt json token
    const payload = JSON.parse(atob(token.split(".")[1])) 
    return Math.floor(Date.now() / 1000) >= payload.expires;
  }

  public isUserLoggedIn(): Observable<boolean> {
    const jwt = sessionStorage.getItem('accessToken');

    // hàm xử lí khi không lấy được chuỗi jwt hoặc token đã hết hạn
    if(!jwt || this.isTokenExpired(jwt)){
      this.logOut();
    }
    else{
      this.isLoggedIn.next(true);
    }

    return this.isLoggedIn.asObservable();
  }

  // lấy ra các lỗi mà có thể gặp phải
  public getErrorMessage(): Array<ErrorMessage>{
    return this.errorMessages;
  }

  // xử lí hàm đăng nhập async (BẤT ĐỒNG BỘ)
  // trả về Promise (một giá tri hoặc một sự kiện có thể xảy ra trong tương lai)
  public async login(username:string, password:string): Promise<any>{
      // khởi tạo một mảng các thông báo lỗi gồm status code và chi tiết lỗi
      this.errorMessages = [{}, {}];
 
      let errorFlag = false;

      // nếu username nhận vào sau khi xử lí dấu cách không tồn tại
      if(!username.trim()){
        this.errorMessages[0].message = "Username is not correct";
        errorFlag = true;
      }

      // xử lí khi không gặp lỗi
      if(!errorFlag){
        const loginModel: LogInModel = new LogInModel(username, password);

        // thưc hiện gửi request về cho BE xử lí
        this.httpClient.post<ResponseObject>(`${SERVER_NO_AUTH_URL}/login`, loginModel)
            .subscribe({
              next: (response: ResponseObject) => {
                // gán giá tri cho các session
                sessionStorage.setItem('role', response.data.accessToken);
                sessionStorage.setItem('id', response.data.role);
                sessionStorage.setItem('accessToken', response.data.accessToken);

                //lấy giá trị role và set quyền
                let roleValues: string | null = sessionStorage.getItem('role');
                if(roleValues != null) {
                  let roles: string[] = roleValues.split(',');
                  if(roles[0] !== 'ROLE_USER'){
                    this.isAdmin.next(true);
                  }
                  else{
                    this.isAdmin.next(false);
                  }
                  this.isLoggedIn.next(true);
                  this.router.navigate(['/']);
                  if(this.isUserLoggedIn()){
                    this.isLoggedIn.next(true);
                    this.router.navigate(['/']);
                  }

                }
              }
            });
      }
  }
}
