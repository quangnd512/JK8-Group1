import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../services/userServices';
import { ActivatedRoute } from '@angular/router';
import { GetUserDto } from '../../../services/dto/getUserDto';
import { FormsModule, NgForm } from '@angular/forms';
import { UpdateUserDto } from '../../../services/dto/updateUserDto';
import { response } from 'express';

@Component({
  selector: 'app-admin-update-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [UserService],
  templateUrl: './admin-update-user.component.html',
  styleUrl: './admin-update-user.component.scss'
})
export class AdminUpdateUserComponent implements OnInit {

  private userServices = inject(UserService);

  private route = inject(ActivatedRoute);

  private userIdParam: string | null = '';

  public user: GetUserDto = {
    maDocGia: 0,
    ten: '',
    ngaySinh: '',
    sdt: '',
    email: '',
    diaCHi: '',
    taiKhoan: null
  }

  constructor() {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params) {
        this.userIdParam = params.get('userId');
        console.log('Giá trị của tham số là:', this.userIdParam);
      }
    });
    this.getUserInfo();
  }

  public getUserInfo() {
    if (this.userIdParam) {
      this.userServices.getUserById(parseFloat(this.userIdParam)).subscribe((data) => {
        this.user = data;
      })
      return;
    }
    return;
  }

  public updateUserInfo(updateUserData: NgForm) {
    if (this.userIdParam) {
      const userId = parseFloat(this.userIdParam);
      const userData: UpdateUserDto = updateUserData.value;

      const isConfirmed = window.confirm("Bạn có chắc chắn muốn cập nhật thông tin không?");

      if (isConfirmed) {
        this.userServices.updateUser(userData, userId).subscribe(
          {
            next: value => {
              alert("Cập nhật thành công");
            },
            error: err => {
              alert("Cập nhật thất bại");
            }
          }
        );
      } else {
        alert("Bạn đã hủy cập nhật thông tin");
      }
    }
  }

}
