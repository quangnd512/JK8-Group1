import {Component} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Observable} from 'rxjs';
import {TakeUntilDestroy} from '../../shared/resources';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})

export class AdminDashboardComponent extends TakeUntilDestroy {
  public page: number = 0
  public isAdmin$: Observable<boolean> = new Observable<boolean>()
  public current: "products-manager" | "users-manager" = "products-manager"

  constructor(private authService: AuthService) {
    super()
  }

  public ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin()
    this.current = "products-manager"
  }

  public productsManager() {
    this.current = "products-manager"
  }

  public usersManager() {
    this.current = "users-manager"
  }
}
