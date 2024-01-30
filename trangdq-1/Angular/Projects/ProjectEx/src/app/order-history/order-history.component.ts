import {Component} from '@angular/core';
import {OrderService} from "../shared/services/order.service";
import {Order, OrderStatus, TakeUntilDestroy} from "../shared/resources";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent extends TakeUntilDestroy {
  public orders: Array<Order> = []
  public status: OrderStatus = OrderStatus.CUSTOMER_CONFIRMED

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
    super()
    this.status = OrderStatus[<string>this.route.snapshot.paramMap.get('status') as OrderStatus]
  }

  public ngOnInit() {
    this.getOrderByStatus();
  }

  public getOrderByStatus() {
    this.orderService.getOrderByStatus(this.status).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.orders = response
          console.log("Orders gotten!")
        },
        error: (error) => {
          console.error(error.message)
        }
      })
  }

  public updateStatus(id: number, fromStatus: OrderStatus, toStatus: OrderStatus) {
    this.orderService.updateStatus(id, fromStatus, toStatus)
    this.orders[id].orderStatus = toStatus
  }
}
