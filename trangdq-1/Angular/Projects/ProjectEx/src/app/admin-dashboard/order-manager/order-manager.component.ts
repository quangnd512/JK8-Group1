import {Component} from '@angular/core';
import {OrderStatus, OutputOrder, TakeUntilDestroy} from "../../shared/resources";
import {OrderService} from "../../shared/services/order.service";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrl: './order-manager.component.scss'
})
export class OrderManagerComponent extends TakeUntilDestroy {
  public orders: Array<OutputOrder> = []
  public status: string = OrderStatus.CUSTOMER_CONFIRMED

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
    super()
  }

  public ngOnInit() {
    this.status = <string>(this.route.snapshot.queryParamMap.get('status')?.toUpperCase())
    this.getOrdersByStatus();
  }

  public getOrdersByStatus() {
    console.log(this.status)
    this.orderService.getOrdersByStatus(this.status).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.orders = response
          console.log("All orders gotten!")
        },
        error: (error) => {
          console.error(error.message)
        }
      })
  }

  public updateStatus(id: number, fromStatus: OrderStatus, toStatus: OrderStatus) {
    this.orderService.updateStatus(id, fromStatus, toStatus)
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].id === id) {
        console.log(this.orders[i])
        this.orders[i].orderStatus = toStatus
        break
      }
    }
  }

}
