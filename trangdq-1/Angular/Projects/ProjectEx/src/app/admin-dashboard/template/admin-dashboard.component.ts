import {Component} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Observable} from 'rxjs';
import {TakeUntilDestroy} from '../../shared/resources';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})

export class AdminDashboardComponent extends TakeUntilDestroy {
  public isAdmin$: Observable<boolean> = new Observable<boolean>()
  public board: "products-manager" | "users-manager" = "products-manager"

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    super()
  }

  public ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin()
    let board = this.route.snapshot.paramMap.get('board')
    if (!board || board === 'products-manager') {
      this.board = "products-manager"
    } else if (board === 'users-manager') {
      this.board = "users-manager"
    }
  }

  public productsManager() {
    this.board = "products-manager"
  }

  public usersManager() {
    this.board = "users-manager"
  }
}
