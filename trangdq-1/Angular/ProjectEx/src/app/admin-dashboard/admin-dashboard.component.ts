import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { ProductService } from '../shared/services/product/product.service';
import { Product } from '../shared/defined';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})

export class AdminDashboardComponent {
  public isAdmin$: Observable<boolean> = new Observable<boolean>
  public page: number = 0
  public products$: Observable<Array<Product>> = new Observable<Array<Product>>
  public displayFooter: boolean = false

  constructor(private authService: AuthService, private productService: ProductService) { }

  ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin()
    this.products$ = this.productService.getProducts()
  } 

}
