import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USERS_URI } from './api';
import { UserInfos } from './interfaces/userInfo';
import { of, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private httpClient = inject(HttpClient);

    constructor() {

    }

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
}
