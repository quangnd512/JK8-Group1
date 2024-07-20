import {Component} from '@angular/core';
import {Product, ResponseObject, TakeUntilDestroy} from '../shared/resources';
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
  public products: Array<Product> = []
  public total_pages: number = 0
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

  private extractState(products$: Observable<ResponseObject>) {
    products$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.products = <Array<Product>>response.data.content
        this.total_pages = <number>response.data.totalPages
      },
      error: (error) => {
        console.log(error)
        return null
      }
    })
  }

  private getProducts() {
    let pageNo = this.route.snapshot.paramMap.get('page')
    if (pageNo) {
      this.page = Number.parseInt(pageNo)
    }
    // FILTER: CATEGORY
    let categoryOn = this.route.snapshot.queryParamMap.get('category')
    // SORTING ?
    let nameOn = this.route.snapshot.queryParamMap.get('name')
    let priceOn = this.route.snapshot.queryParamMap.get('price')
    let inStockOn = this.route.snapshot.queryParamMap.get('inStock')
    this.name_asc = !(nameOn && nameOn === 'true')
    this.price_asc = !(priceOn && priceOn === 'true')
    this.inStock_asc = !(inStockOn && inStockOn === 'true')
    if (categoryOn) {
      this.query_params = "?category=" + categoryOn
      this.extractState(this.productService.getProducts(this.page - 1, "category", false, true, categoryOn))
    } else if (nameOn) {
      this.query_params = "?name=" + !this.name_asc
      this.extractState(this.productService.getProducts(this.page - 1, "name", true, false, !this.name_asc ? "asc" : "desc"))
    } else if (priceOn) {
      this.query_params = "?price=" + !this.price_asc
      this.extractState(this.productService.getProducts(this.page - 1, "price", true, false, !this.price_asc ? "asc" : "desc"))
    } else if (inStockOn) {
      this.query_params = "?inStock=" + !this.inStock_asc
      this.extractState(this.productService.getProducts(this.page - 1, "inStock", true, false, !this.inStock_asc ? "asc" : "desc"))
    } else {
      // SEARCH
      this.query_params = ''
      this.searchService.searchKeyword$.pipe(takeUntil(this.destroy$)).subscribe({
        next: keyword => {
          if (keyword && keyword !== '') {
            this.query_params = '?search=' + keyword
            this.extractState(this.searchService.searchProducts(this.page - 1, keyword))
          } else {
            this.extractState(this.productService.getProducts(this.page - 1))
          }
        },
        // NOTHING
        error: () => {
          this.extractState(this.productService.getProducts(this.page - 1))
        }
      })
    }
  }
}
