import {Component} from '@angular/core';
import {OrderService} from "../shared/services/order.service";
import {Order, OrderStatus, OutputOrder, TakeUntilDestroy} from "../shared/resources";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent extends TakeUntilDestroy {
  public orders: Array<OutputOrder> = []
  public status: OrderStatus = OrderStatus.CUSTOMER_CONFIRMED

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
    super()
    let st = <string>this.route.snapshot.queryParamMap.get('status')
    if (st) {
      this.status = OrderStatus[st as OrderStatus]
    }
  }

  public ngOnInit() {
    this.getUserOrdersByStatus();
  }

  public getUserOrdersByStatus() {
    this.orderService.getUserOrdersByStatus(this.status).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response)
          this.orders = response
          console.log("Customer's orders gotten!")
        },
        error: (error) => {
          console.error(error.message)
        }
      })
  }

  public updateStatus(order: OutputOrder, toStatus: string) {
    this.orderService.updateStatus(order.id, order.orderStatus, toStatus).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response.message)
        },
        error: error => {
          console.log(error.message)
        }
      })
    order.orderStatus = toStatus
  }

  protected readonly OrderStatus = OrderStatus;
}
