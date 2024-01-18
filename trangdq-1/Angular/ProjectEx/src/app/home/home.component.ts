import {Component} from '@angular/core';
import {Product} from '../shared/defined';
import {Observable} from 'rxjs';
import {ProductService} from '../shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public page: number = 0
  public products$: Observable<Array<Product>> = new Observable<Array<Product>>()

  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.products$ = this.productService.getProducts(this.page)
  }
}
