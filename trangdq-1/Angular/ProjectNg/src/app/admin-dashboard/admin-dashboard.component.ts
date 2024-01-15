import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})

export class AdminDashboardComponent {
  public isAdmin$: Observable<boolean> = new Observable<boolean>
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin()
  }
}
