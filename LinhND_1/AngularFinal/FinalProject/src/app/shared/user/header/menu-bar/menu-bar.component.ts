import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent implements OnInit {

  public isAdmin$: Observable<boolean> = new Observable<boolean>();
  public isLoggedIn$: Observable<boolean> = new Observable<boolean>();

  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.isAdmin$ = this.authService.isUserAdmin();
    this.isLoggedIn$ = this.authService.isUserLoggedIn();
  }

  logout(): void {
    this.authService.logOut();
  }

}
