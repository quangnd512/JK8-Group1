import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, catchError, Observable, tap} from 'rxjs';
import {ErrorMessage, PASSWORD_PATTERN, SERVER_URL} from '../resources';
import {HttpClient} from '@angular/common/http';

type LoginResponse = {
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
  ) {
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    if (this.validateData(username, password)) {
      return this.http.post<LoginResponse>(`${SERVER_URL}/login`, {username, password})
        .pipe(
          tap(response => {
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('role', response.role)
            localStorage.setItem('userId', response.userId);
            this.router.navigate(['/']);
          }),
          catchError(error => {
            if (error.error?.message) {
              throw new Error(error.error.message);
            } else {
              throw new Error(error.statusText);
            }
          }))
    }
    throw new Error('Invalid username or password!');
  }

  public getErrors(): Array<ErrorMessage> {
    return this.errors
  }

  public isLoggedIn(): Observable<boolean> {
    const jwt = localStorage.getItem('token');
    if (jwt && !this.isTokenExpired(jwt)) {
      this.loggedIn.next(true)
    } else {
      this.loggedIn.next(false)
    }
    return this.loggedIn.asObservable()
  }

  public isAdmin(): Observable<boolean> {
    const jwt = localStorage.getItem('token');
    if (jwt && !this.isTokenExpired(jwt) && localStorage.getItem('role') === 'ROLE_ADMIN') {
      this.admin.next(true);
    } else {
      this.admin.next(false);
    }
    return this.admin.asObservable()
  }

  public logout(): Observable<any> {
    return this.http.post<void>(`${SERVER_URL}/logout`, {})
      .pipe(
        tap(() => {
          this.loggedIn.next(false)
          this.admin.next(false)
          localStorage.removeItem('userId')
          localStorage.removeItem('token')
          this.router.navigate(['/login'])
        }),
        catchError(() => {
          throw new Error('Failed to logout...')
        })
      )
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1])); // decrypt
    return Math.floor(Date.now() / 1000) >= payload.exp;
  }

  private validateData(username: string, password: string): boolean {
    this.errors = [{}, {}]
    let should = true
    if (!username.trim()) {
      this.errors[0].message = "*Username is not available."
      should = false
    }
    if (!password.match(PASSWORD_PATTERN)) {
      this.errors[1].message = "*Invalid password."
      should = false
    }
    return should
  }
}
