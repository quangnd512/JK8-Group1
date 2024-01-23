import {Component, OnInit} from '@angular/core';
import {Observable, takeUntil} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {TakeUntilDestroy} from "../../resources";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent extends TakeUntilDestroy implements OnInit {
  public isLoggedIn$: Observable<boolean> = new Observable<boolean>()
  public isAdmin$: Observable<boolean> = new Observable<boolean>()

  constructor(private authService: AuthService) {
    super();
  }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn()
    this.isAdmin$ = this.authService.isAdmin()
  }

  public logout(): void {
    this.authService.logout().pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => console.log('Logout successfully!'),
        error: (error) => alert(error.message)
      })
  }
}
