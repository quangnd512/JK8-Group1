import {Component} from '@angular/core';
import {OrderService} from "../shared/services/order.service";
import {OrderStatus, OutputOrder, TakeUntilDestroy} from "../shared/resources";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Observable, takeUntil} from "rxjs";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent extends TakeUntilDestroy {
  public orders$: Observable<Array<OutputOrder>> = new Observable<Array<OutputOrder>>()
  public status: string = OrderStatus.CUSTOMER_CONFIRMED
  public page: number = 1
  protected readonly OrderStatus = OrderStatus;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) {
    super()
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => this.getUserOrdersByStatus());
  }

  public ngOnInit() {
    this.getUserOrdersByStatus();
  }

  public getUserOrdersByStatus() {
    let st = <string>(this.route.snapshot.queryParamMap.get('status')?.toUpperCase())
    if (st) this.status = st; else this.status = OrderStatus.CUSTOMER_CONFIRMED
    this.orders$ = this.orderService.getUserOrdersByStatus(this.status, this.page - 1)
  }

  public updateStatus(order: OutputOrder, toStatus: OrderStatus) {
    this.orderService.updateStatus(order.id, order.orderStatus, toStatus).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response.message)
          order.orderStatus = toStatus
        },
        error: error => {
          alert(error.error.message)
        }
      })
  }

  public status2Display(status: OrderStatus) {
    switch (status) {
      case OrderStatus.CANCELED:
        return "Canceled"
      case OrderStatus.SUCCESS:
        return "Succeeded"
      case OrderStatus.SHIPPING:
        return "Shipping"
      case OrderStatus.ADMIN_PREPARING:
        return "Preparing"
      case OrderStatus.CUSTOMER_REQUEST_CANCEL:
        return "Canceling"
      case OrderStatus.CUSTOMER_CONFIRMED:
        return "Processing"
      default:
        return status
    }
  }
}
