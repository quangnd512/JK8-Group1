import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input('position') public position: 'home' | 'admin-dashboard' = 'home'
  public total_pages$: Observable<number> = new Observable<number>()
  @Input() public board: string = ''
  public page: number = 1
  @Input() public query_params = ''

  constructor(private route: ActivatedRoute, private productService: ProductService, private userService: UserService) {
  }

  public ngOnInit() {
    let pageNo = this.route.snapshot.paramMap.get('page')
    if (pageNo) {
      this.page = Number.parseInt(pageNo)
    }
    if (this.board === "users-manager") {
      this.total_pages$ = this.userService.getTotalPages()
    } else {
      if (this.query_params.indexOf('search') !== -1) {
        this.total_pages$ = this.productService.getTotalSearchedPages(this.query_params.slice(this.query_params.indexOf('=') + 1))
      } else {
        this.total_pages$ = this.productService.getTotalPages()
      }
    }
    if (this.board !== '') this.board = this.board + '/'
  }
}
