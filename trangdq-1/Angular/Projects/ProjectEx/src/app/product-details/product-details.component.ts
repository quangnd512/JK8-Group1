import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../shared/services/product.service';
import {Observable} from 'rxjs';
import {Product} from '../shared/resources';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent {
  public product$: Observable<Product> = new Observable<Product>()

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    let id: number = Number.parseInt(<string>this.route.snapshot.paramMap.get('id')) // cast
    this.product$ = this.productService.getProductById(id) // async
  }
}