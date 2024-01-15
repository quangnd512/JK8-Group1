import { Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorMessage, LoginDTO, SERVER_URL } from '../defined';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

const pattern = /^[A-Z][a-zA-Z0-9]{7}$/;
// const pattern = /^[0-9]{6}$/;

type ResponseObject = {
  accessToken: string,
  userId: string,
  role: 'ROLE_ADMIN' | 'ROLE_USER'
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private errors: Array<ErrorMessage> = []

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>) { }

  public logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loggedIn.next(false)
      this.admin.next(false)
      localStorage.setItem('role', '')
      localStorage.setItem('userId', '')
      localStorage.setItem('token', '')
      this.router.navigate(['/login'])
    }
  }

  public isLoggedIn(): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      const jwt = localStorage.getItem('token');
      if (!jwt || this.isTokenExpired(jwt)) {
        this.logout();
      } else {
        this.loggedIn.next(true)
      }
    } else {
      this.logout()
    }
    return this.loggedIn.asObservable()
  }

  private isTokenExpired(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1])); // decode
    return Math.floor(Date.now() / 1000) >= payload.exp;
  }

  public isAdmin(): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn().subscribe(state => {
        if (state && localStorage.getItem("role") === "ROLE_ADMIN") {
          this.admin.next(true)
        } else {
          this.admin.next(false)
        }
      })
      return this.admin.asObservable()
    } else {
      this.logout()
      return this.admin.asObservable()
    }
  }

  public getErrors(): Array<ErrorMessage> {
    return this.errors
  }

  public async login(username: string, password: string): Promise<any> {
    this.errors = [{}, {}]
    let should = true
    username = username.trim()
    if (!username) {
      this.errors[0].message = "*Username is not available."
      should = false
    }
    if (!password.match(pattern)) {
      this.errors[1].message = "*Invalid password."
      should = false
    }

    if (should) {
      const loginDTO: LoginDTO = {
        username: username,
        password: password
      };
      const data: ResponseObject = await fetch(`${SERVER_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(loginDTO),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        console.log(response);

        if (!response.ok) throw new Error("HTTP error: " + response.status);
        else return response.json();
      }).catch(error => {
        console.error('Login error: ', error);
      });

      if (data) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('role', data.role)
        localStorage.setItem('userId', data.userId)
        if (this.isLoggedIn()) {
          this.loggedIn.next(true)
          this.router.navigate(['/'])
        }
      } else {
        alert('User not found!')
      }
    }


    // this.http.post<LoginResponse>(`${SERVER_URL}/login`, loginDTO)
    //   .subscribe({
    //     next: (response) => {
    //       localStorage.setItem('token', response.token);
    //       console.log(response.token);
    //       localStorage.setItem('token', response.accessToken);
    //       localStorage.setItem('role', response.role)
    //       localStorage.setItem('userId', response.userId)
    //       if (localStorage.getItem('role') === "ROLE_ADMIN") this.admin.next(true)
    //       else this.admin.next(false)
    //       this.loggedIn.next(true)
    //       this.router.navigate(['/'])
    //     },
    //     error: (error) => {
    //       console.error(error);
    //     },
    //   });
  }

}