import {Component} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {filter, Observable, takeUntil} from 'rxjs';
import {OrderStatus, TakeUntilDestroy} from '../../shared/resources';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})

export class AdminDashboardComponent extends TakeUntilDestroy {
  public isAdmin$: Observable<boolean> = new Observable<boolean>()
  public board: "products-manager" | "users-manager" | "orders-manager" | "vouchers-manager" = "products-manager"
  public status: string | null = null
  protected readonly OrderStatus = OrderStatus;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    super()
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadState()
    });
  }

  public loadState() {
    this.isAdmin$ = this.authService.isAdmin()
    this.status = this.route.snapshot.queryParamMap.get('status')
    let board = this.route.snapshot.paramMap.get('board')
    if (board === 'products-manager') {
      this.onProductsManager()
    } else if (board === 'users-manager') {
      this.onUsersManager()
    } else if (board === 'orders-manager') {
      this.onOrdersManager()
    } else if (board === 'vouchers-manager') {
      this.onVouchersManager()
    }
  }

  public ngOnInit(): void {
    this.loadState()
  }

  public ngOnChanges() {

  }

  public onProductsManager() {
    this.board = "products-manager"
  }

  public onVouchersManager() {
    this.board = "vouchers-manager"
  }

  public onUsersManager() {
    this.board = "users-manager"
  }

  public onOrdersManager() {
    this.board = "orders-manager"
  }
}
