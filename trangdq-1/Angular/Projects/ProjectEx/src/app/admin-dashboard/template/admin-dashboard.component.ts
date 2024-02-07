import {Component} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Observable} from 'rxjs';
import {OrderStatus, TakeUntilDestroy} from '../../shared/resources';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})

export class AdminDashboardComponent extends TakeUntilDestroy {
  public isAdmin$: Observable<boolean> = new Observable<boolean>()
  public board: "products-manager" | "users-manager" | "orders-manager" = "products-manager"
  protected readonly OrderStatus = OrderStatus;

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    super()
  }

  public ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin()
    let board = this.route.snapshot.paramMap.get('board')
    if (board === 'products-manager') {
      this.onProductsManager()
    } else if (board === 'users-manager') {
      this.onUsersManager()
    } else if (board === 'orders-manager') {
      this.onOrdersManager()
    }
  }

  public onProductsManager() {
    this.board = "products-manager"
  }

  public onUsersManager() {
    this.board = "users-manager"
  }

  public onOrdersManager() {
    this.board = "orders-manager"
  }
}
