import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, catchError, Observable, tap} from 'rxjs';
import {SERVER_URL} from '../resources';
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

  constructor(private router: Router, private http: HttpClient) {
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${SERVER_URL}/login`, {username, password})
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('role', response.role)
          localStorage.setItem('userId', response.userId);
          this.router.navigate(['/home/1']);
        }),
        catchError(error => {
          if (error.error?.message) {
            throw new Error(error.error.message);
          } else if (error.error?.statusText) {
            throw new Error(error.statusText);
          } else {
            throw new Error(error.message)
          }
        }))
  }

  public isLoggedIn(): Observable<boolean> {
    const jwt = localStorage.getItem('token');
    if (jwt && !this.isTokenExpired(jwt)) {
      this.loggedIn.next(true)
    } else {
      this.logoutFromClient()
    }
    return this.loggedIn.asObservable()
  }

  public isAdmin(): Observable<boolean> {
    const jwt = localStorage.getItem('token');
    if (jwt && !this.isTokenExpired(jwt)) {
      if (localStorage.getItem('role') === 'ROLE_ADMIN') {
        this.admin.next(true);
      } else {
        this.admin.next(false);
      }
    } else {
      this.logoutFromClient()
    }
    return this.admin.asObservable()
  }

  public logout(): Observable<any> {
    return this.http.post<any>(`${SERVER_URL}/logout`, {})
      .pipe(
        tap(() => {
          this.logoutFromClient()
          this.router.navigate(['/login'])
        }),
        catchError(() => {
          throw new Error('Failed to logout from server...')
        })
      )
  }

  private logoutFromClient() {
    localStorage.clear()
    this.admin.next(false);
    this.loggedIn.next(false)
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1])); // decrypt
    return Math.floor(Date.now() / 1000) >= payload.exp;
  }
}
