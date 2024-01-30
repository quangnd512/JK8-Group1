import { Injectable, inject } from '@angular/core';
import { ADD_ACCOUNT_URI, BASE__URL, LOGIN__URI } from './api';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { LoginInterface } from './interfaces/login/login.interface';
import { LoginResponseInterface } from './interfaces/login/loginResponse.interface';
import { AddAccountDto } from './dto/addAccountDto';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationServices {

    private httpClient = inject(HttpClient);

    constructor() {

    }

    public login(userData: LoginInterface): Observable<LoginResponseInterface | null> {
        const user = {
            tenTk: userData.username,
            matKhau: userData.password
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200', // Add your client origin
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Add allowed methods
            'Access-Control-Allow-Headers': 'Content-Type' // Add allowed headers
        });

        return this.httpClient.post<LoginResponseInterface>(BASE__URL.concat(LOGIN__URI), user, { headers }).
            pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error('Login request failed:', error);
                    throw error;
                })
            );;
    }

    public addAccount(userData: AddAccountDto): Observable<AddAccountDto | null> {
        return this.httpClient.post<AddAccountDto | null>(BASE__URL.concat(ADD_ACCOUNT_URI), userData);
    }
}
