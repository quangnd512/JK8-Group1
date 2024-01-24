import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE__URL, DELETE_USER, GET_ALL_USERS_URI, GET_USER_URI, UPDATE_USER_URI, USERS_URI } from './api';
import { UserInfos } from './interfaces/userInfo';
import { of, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { GetUserDto } from './dto/getUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private httpClient = inject(HttpClient);

    constructor() {

    }

    public getAllUsers(): Observable<GetUserDto[]> {
        return this.httpClient.get<GetUserDto[]>(BASE__URL.concat(GET_ALL_USERS_URI)).pipe(
            catchError(err => {
                throw err;
            })
        )
    }

    public getUserById(userId: number): Observable<GetUserDto> {
        return this.httpClient.get<GetUserDto>(BASE__URL.concat(GET_USER_URI + "?maTk=" + userId)).pipe(
            catchError(err => {
                throw err;
            })
        )
    }

    public updateUser(userData: UpdateUserDto, accId: number): Observable<UpdateUserDto> {
        return this.httpClient.put<UpdateUserDto>(BASE__URL.concat(UPDATE_USER_URI + "?maTk=" + accId), userData).
            pipe(
                catchError(err => {
                    throw err;
                })
            );
    }

    public deleteUser(id: any): Observable<any> {
        return this.httpClient.put<any>(BASE__URL.concat(DELETE_USER + "?maTk=" + id), null);
    }

}
