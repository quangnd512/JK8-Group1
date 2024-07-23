import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {getUserId, headers, NewUserDTO, Response, ResponseObject, SERVER_URL, User} from "../resources";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  public getUsers(page: number = 0): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/admin/users/${page}`, {headers: headers()})
  }

  public getTotalUsers(): Observable<number> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/admin/users/0`, {headers: headers()})
      .pipe(
        map(response => response.data.totalElements as number),
        catchError(error => {
          console.error(error);
          return of(0);
        })
      );
  }

  public getTotalPages() {
    return this.http.get<ResponseObject>(`${SERVER_URL}/admin/users/0`, {headers: headers()})
      .pipe(
        map(response => response.data.totalPages as number),
        catchError(error => {
          console.error(error);
          return of(0);
        })
      );
  }

  // handle error later
  public getUserById(id: number): Observable<User> {
    return this.http.get<Response>(`${SERVER_URL}/admin/user/${id}`, {headers: headers()})
      .pipe(
        map(response => response.data as User)
      );
  }

  // customer's right
  // handle error later
  public getCustomerById(id: number): Observable<User> {
    return this.http.get<Response>(`${SERVER_URL}/customer/${id}`, {headers: headers()})
      .pipe(
        map(response => response.data as User),
      );
  }

  // handle error later
  public addUser(user: NewUserDTO): Observable<Response> {
    return this.http.post<Response>(`${SERVER_URL}/admin/user`, user, {headers: headers()})
  }

  // handle error later
  public updateUser(id: number, user: FormData): Observable<Response> {
    return this.http.put<Response>(`${SERVER_URL}/admin/user/${id}`, user, {
      headers: headers()
    })
  }

  public updateProfile(customer: FormData): Observable<Response> {
    return this.http.put<Response>(`${SERVER_URL}/customer/${getUserId()}`, customer, {
      headers: headers()
    })
  }

  // handle error later
  public deleteUser(id: number): Observable<Response> {
    return this.http.delete<Response>(`${SERVER_URL}/admin/user/${id}`, {headers: headers()});
  }

  public register(user: NewUserDTO): Observable<Response> {
    return this.http.post<Response>(`${SERVER_URL}/register`, user)
  }

}
