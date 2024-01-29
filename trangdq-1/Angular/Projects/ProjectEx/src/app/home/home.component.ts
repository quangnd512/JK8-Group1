import {Component} from '@angular/core';
import {Product} from '../shared/resources';
import {Observable} from 'rxjs';
import {ProductService} from '../shared/services/product.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public page: number = 1
  public products$: Observable<Array<Product>> = new Observable()
  public name_asc = true
  public price_asc = true
  public inStock_asc = true
  public query_params: string = ''
  public keywords: string | null = ''

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
  }

  public ngOnInit(): void {
    let pageNo = this.route.snapshot.paramMap.get('page')
    if (pageNo) {
      this.page = Number.parseInt(pageNo)
    }
    // SORTING ?
    let nameOn = this.route.snapshot.queryParamMap.get('name')
    let priceOn = this.route.snapshot.queryParamMap.get('price')
    let inStockOn = this.route.snapshot.queryParamMap.get('inStock')
    this.keywords = this.route.snapshot.queryParamMap.get('search')
    this.name_asc = !(nameOn && nameOn === 'true')
    this.price_asc = !(priceOn && priceOn === 'true')
    this.inStock_asc = !(inStockOn && inStockOn === 'true')

    if (this.keywords !== null) {
      this.query_params = '?search=' + this.keywords
      this.products$ = this.productService.searchProducts(this.page - 1, this.keywords)
    } else if (nameOn) {
      this.query_params = "?name=" + !this.name_asc
      this.products$ = this.productService.getProducts(this.page - 1, "name", !this.name_asc ? "asc" : "desc")
    } else if (priceOn) {
      this.query_params = "?price=" + !this.price_asc
      this.products$ = this.productService.getProducts(this.page - 1, "price", !this.price_asc ? "asc" : "desc")
    } else if (inStockOn) {
      this.query_params = "?inStock=" + !this.inStock_asc
      this.products$ = this.productService.getProducts(this.page - 1, "inStock", !this.inStock_asc ? "asc" : "desc")
    } else {
      this.query_params = ''
      this.products$ = this.productService.getProducts(this.page - 1)
    }
  }
}
