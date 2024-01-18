import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorMessage, LoginDTO, SERVER_URL } from '../../defined';
import { HttpClient } from '@angular/common/http';

const pattern = /^[A-Z][a-zA-Z0-9]{7}$/;

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

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  public async logout(): Promise<void> {
    this.http.post<void>(`${SERVER_URL}/logout`,{})
      .subscribe({
        next: () => {
          this.loggedIn.next(false)
          this.admin.next(false)
          localStorage.removeItem('role')
          localStorage.removeItem('userId')
          localStorage.removeItem('token')
          this.router.navigate(['/login'])
        },
        error: () => {
          alert('Failed to logout...')
        },
      });
  }

  public isLoggedIn(): Observable<boolean> {
    const jwt = localStorage.getItem('token');
    if (!jwt || this.isTokenExpired(jwt)) {
      this.logout();
    } else {
      this.loggedIn.next(true)
    }
    return this.loggedIn.asObservable()
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1])); // decrypt
    return Math.floor(Date.now() / 1000) >= payload.exp;
  }

  public isAdmin(): Observable<boolean> {
    this.isLoggedIn().subscribe(state => {
      if (state && localStorage.getItem("role") === "ROLE_ADMIN") {
        this.admin.next(true)
      } else {
        this.admin.next(false)
      }
    })
    return this.admin.asObservable()
  }

  public getErrors(): Array<ErrorMessage> {
    return this.errors
  }

  private validateData(username: string, password: string): boolean {
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
    return should
  }

  public async login(username: string, password: string): Promise<void> {
    if (this.validateData(username, password)) {
      const loginDTO: LoginDTO = {
        username: username,
        password: password
      };

      this.http.post<ResponseObject>(`${SERVER_URL}/login`, loginDTO)
        .subscribe({
          next: (response) => {
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('role', response.role)
            localStorage.setItem('userId', response.userId)
            this.router.navigate(['/'])
          },
          error: (error) => {
            if (error.error.message) {
              alert(error.error.message)
            } else {
              alert(error.statusText)
            }
          },
        });
    }
  }
}
