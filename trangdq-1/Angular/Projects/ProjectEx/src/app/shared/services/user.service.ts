import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {headers, NewUserDTO, Response, ResponseObject, SERVER_URL, User} from "../resources";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  public getUsers(page: number = 0): Observable<Array<User>> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/admin/users/${page}`, {headers})
      .pipe(
        map(response =>
          response.data.content as Array<User>),
        catchError(error => {
          console.error(error);
          return of([]);
        })
      );
  }

  public getTotalUsers(): Observable<number> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/admin/users`, {headers})
      .pipe(
        map(response => response.data.totalElements as number),
        catchError(error => {
          console.error(error);
          return of(0);
        })
      );
  }

  public addUser(user: NewUserDTO): Observable<Response> {
    return this.http.post<Response>(`${SERVER_URL}/admin/user`, user, {headers})
  }

  public updateUser(user: User): Observable<Response> {
    return this.http.put<Response>(`${SERVER_URL}/admin/user/${user.id}`, user, {headers})
  }

  public deleteUser(id: number): Observable<Response> {
    return this.http.delete<Response>(`${SERVER_URL}/admin/user/${id}`, {headers});
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<Response>(`${SERVER_URL}/admin/user/${id}`, {headers})
      .pipe(
        map(response => response.data as User),
      );
  }

  public getTotalPages() {
    return this.http.get<ResponseObject>(`${SERVER_URL}/admin/users/0`, {headers})
      .pipe(
        map(response => response.data.totalPages as number),
        catchError(error => {
          console.error(error);
          return of(0);
        })
      );
  }
}
