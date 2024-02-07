import {Component} from '@angular/core';
import {OrderStatus, OutputOrder, TakeUntilDestroy} from "../../shared/resources";
import {OrderService} from "../../shared/services/order.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Observable, takeUntil} from "rxjs";

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrl: './order-manager.component.scss'
})
export class OrderManagerComponent extends TakeUntilDestroy {
  protected readonly OrderStatus = OrderStatus;
  public orders$: Observable<Array<OutputOrder>> = new Observable<Array<OutputOrder>>()
  public total_orders$: Observable<number> = new Observable<number>()
  public status: string = OrderStatus.CUSTOMER_CONFIRMED
  public page: number = 1
  public displayDetails: boolean = false
  public displayNote: boolean = false
  public current_order: OutputOrder | undefined

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) {
    super()
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.getOrdersByStatus());
  }

  public ngOnInit() {
    this.getOrdersByStatus()
  }

  public updateStatus(order: OutputOrder, toStatus: OrderStatus) {
    this.orderService.updateStatus(order.id, order.orderStatus, toStatus).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log("Admin update: " + response.message)
          this.getOrdersByStatus()
        },
        error: error => {
          console.log(error.message)
        }
      })
  }

  public status2Display(status: OrderStatus | string) {
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

  private getOrdersByStatus() {
    let st = <string>(this.route.snapshot.queryParamMap.get('status')?.toUpperCase())
    this.status = st ? st : OrderStatus.CUSTOMER_CONFIRMED
    this.orders$ = this.orderService.getOrdersByStatus(this.status, this.page - 1)
    this.total_orders$ = this.orderService.getTotalOrdersByStatus(this.status)
  }

  viewOrderDetails(order: OutputOrder) {
    this.displayDetails = true
    this.current_order = order
  }

  viewOrderNote(order: OutputOrder | undefined = undefined) {
    this.displayNote = true
    this.current_order = order
  }

  closeOrderDetails() {
    this.displayDetails = false
  }

  closeOrderNote() {
    this.displayNote = false
  }
}
