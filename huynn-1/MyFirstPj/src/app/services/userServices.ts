import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE__URL, GET_ALL_USERS_URI, GET_USER_URI, USERS_URI } from './api';
import { UserInfos } from './interfaces/userInfo';
import { of, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { GetUserDto } from './dto/getUserDto';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private httpClient = inject(HttpClient);

    constructor() {

    }

    public getAllUsers(): Observable<GetUserDto[]> {
        return this.httpClient.get<GetUserDto[]>(BASE__URL.concat(GET_ALL_USERS_URI)).pipe(
            catchError( err => {
                throw err;
            } )
        )
    }

    public getUserById(userId: number): Observable<GetUserDto> {
        return this.httpClient.get<GetUserDto>(BASE__URL.concat(GET_USER_URI + "?maTk=" + userId)).pipe(
            catchError(err => {
                throw err;
            })
        )
    }

    // decripted
    public getUsers(): Observable<UserInfos[]> {
        return this.httpClient.get<UserInfos[]>(USERS_URI);
    }

    public getUser(userId: string): Observable<UserInfos> {
        return this.httpClient.get<UserInfos>(USERS_URI.concat("/" + userId));
    }

    public createUser(userData: UserInfos): Observable<UserInfos | null> {

        return this.getUsers().pipe(
            switchMap((listUser: UserInfos[]) => {
                // Kiểm tra xem user name đã tồn tại chưa
                const isUserNameExists = listUser.some(user => user.userName === userData.userName);
                if (isUserNameExists) {
                    throw 'Tên người dùng đã tồn tại';
                }

                // Kiểm tra xem email đã tồn tại chưa
                const isEmailExists = listUser.some(user => user.email === userData.email);
                if (isEmailExists) {
                    throw ('Email đã được sử dụng');
                }

                return this.httpClient.post<UserInfos>(USERS_URI, userData);
            }),
            catchError(error => {
                throw error;
            })
        );
    }
    // decripted

}
