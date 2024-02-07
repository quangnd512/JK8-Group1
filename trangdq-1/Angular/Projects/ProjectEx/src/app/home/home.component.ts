import {Component} from '@angular/core';
import {Product, TakeUntilDestroy} from '../shared/resources';
import {filter, Observable, takeUntil} from 'rxjs';
import {ProductService} from '../shared/services/product.service';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SearchService} from "../shared/services/search.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends TakeUntilDestroy {
  public page: number = 1
  public products$: Observable<Array<Product>> = new Observable<Array<Product>>()
  public total_products$: Observable<number> = new Observable<number>()
  public name_asc = true
  public price_asc = true
  public inStock_asc = true
  public query_params: string = ''

  constructor(private searchService: SearchService, private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    super()
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.getProducts());
  }

  public ngOnInit(): void {
    this.getProducts()
  }

  private getProducts() {
    let pageNo = this.route.snapshot.paramMap.get('page')
    if (pageNo) {
      this.page = Number.parseInt(pageNo)
    }
    this.total_products$ = this.productService.getTotalProducts()
    // SORTING ?
    let nameOn = this.route.snapshot.queryParamMap.get('name')
    let priceOn = this.route.snapshot.queryParamMap.get('price')
    let inStockOn = this.route.snapshot.queryParamMap.get('inStock')
    this.name_asc = !(nameOn && nameOn === 'true')
    this.price_asc = !(priceOn && priceOn === 'true')
    this.inStock_asc = !(inStockOn && inStockOn === 'true')
    if (nameOn) {
      this.query_params = "?name=" + !this.name_asc
      this.products$ = this.productService.getProducts(this.page - 1, "name", !this.name_asc ? "asc" : "desc")
    } else if (priceOn) {
      this.query_params = "?price=" + !this.price_asc
      this.products$ = this.productService.getProducts(this.page - 1, "price", !this.price_asc ? "asc" : "desc")
    } else if (inStockOn) {
      this.query_params = "?inStock=" + !this.inStock_asc
      this.products$ = this.productService.getProducts(this.page - 1, "inStock", !this.inStock_asc ? "asc" : "desc")
    } else {
      // SEARCH
      this.searchService.searchKeyword$.pipe(takeUntil(this.destroy$)).subscribe({
        next: keyword => {
          if (keyword) {
            this.query_params = '?search=' + keyword
          }
          this.products$ = this.searchService.searchProducts(this.page - 1, keyword)
        },
        // NOTHING
        error: () => {
          this.query_params = ''
          this.products$ = this.productService.getProducts(this.page - 1)
        }
      })
    }
  }
}
