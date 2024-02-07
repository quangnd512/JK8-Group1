import {Component, Input} from '@angular/core';
import {Observable, of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() public position: 'home' | 'admin-dashboard' | 'my-orders' = 'home'
  @Input() public board: string = ''
  @Input() public query_params = ''
  public page: number = 1
  public total_pages$: Observable<number> = new Observable<number>()

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private userService: UserService,
              private orderService: OrderService) {
  }

  public ngOnInit() {
    this.page = Number.parseInt(<string>this.route.snapshot.paramMap.get('page'))

    switch (this.position) {
      case "admin-dashboard":
        switch (this.board) {
          case "users-manager":
            this.total_pages$ = this.userService.getTotalPages()
            break
          case "orders-manager":
            if (this.query_params.indexOf('status') !== -1) {
              this.total_pages$ = this.orderService.getOrdersByStatusTotalPages(this.query_params.slice(this.query_params.indexOf('=') + 1))
            }
            break
          case "products-manager":
            this.total_pages$ = this.productService.getTotalPages()
            break
        }
        break
      case "home":
        if (this.query_params.indexOf('search') !== -1) {
          this.total_pages$ = this.productService.getTotalSearchedPages(this.query_params.slice(this.query_params.indexOf('=') + 1))
        } else {
          this.total_pages$ = this.productService.getTotalPages()
        }
        break
      case "my-orders":
        this.total_pages$ = this.orderService.getUserOrdersByStatusTotalPages(this.query_params.slice(this.query_params.indexOf('=') + 1))
        break
      default:
        this.total_pages$ = of(0)
    }

    if (this.board !== '') this.board = this.board + '/'
  }
}
