import {Component, Input, SimpleChanges} from '@angular/core';
import {filter, takeUntil} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {TakeUntilDestroy} from "../../resources";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent extends TakeUntilDestroy {
  @Input() public position: 'home' | 'admin-dashboard' | 'my-orders' = 'home'
  @Input() public board: string = ''
  @Input() public query_params = ''
  @Input() public total_pages: number = 0
  public query_object = {}
  public page: number = 1

  constructor(private route: ActivatedRoute, private router: Router) {
    super()
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.loadState());
  }

  public getLink(page: number): string[] {
    if (this.board === '') {
      return ['/', this.position, page.toString()];
    } else {
      return ['/', this.position, this.board, page.toString()];
    }
  }

  public ngOnInit() {
    this.loadState()
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['query_params']) {
      this.loadState();
    }
  }

  private loadState() {
    this.query_object = {}
    this.page = Number.parseInt(<string>this.route.snapshot.paramMap.get('page'))
    if (this.query_params) {
      let param = this.query_params.slice(1, this.query_params.indexOf('='))
      let value = this.query_params.slice(this.query_params.indexOf('=') + 1)
      this.query_object = {
        [param]: value
      }
    }
  }
}
