import {Component} from '@angular/core';
import {OrderService} from "../../shared/services/order.service";
import {OrderStatus, OutputOrder, ResponseObject, TakeUntilDestroy} from "../../shared/resources";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Observable, takeUntil} from "rxjs";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent extends TakeUntilDestroy {
  public orders: Array<OutputOrder> = []
  public total_pages: number = 0
  public total_orders: number = 0
  public status: string = OrderStatus.CUSTOMER_CONFIRMED
  public page: number = 1
  public display_details: boolean = false
  public display_note: boolean = false
  public current_order: OutputOrder | undefined
  public color: string = ''
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
    this.page = Number.parseInt(<string>this.route.snapshot.paramMap.get('page'))
    let st = <string>(this.route.snapshot.queryParamMap.get('status')?.toUpperCase())
    if (st) this.status = st; else this.status = OrderStatus.CUSTOMER_CONFIRMED
    this.extractState(this.orderService.getUserOrdersByStatus(this.status, this.page - 1))
  }

  public updateStatus(order: OutputOrder, toStatus: OrderStatus) {
    this.orderService.updateStatus(order.id, order.orderStatus, toStatus).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          order.orderStatus = toStatus
          if (toStatus === OrderStatus.CANCELED && order.voucherId !== -1) {
            alert('One voucher is restored.')
          }
        },
        error: error => {
          alert(error.error.message)
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

  public viewOrderDetails(order: OutputOrder) {
    this.display_details = true
    this.current_order = order
  }

  public viewOrderNote(order: OutputOrder | undefined = undefined) {
    this.display_note = true
    this.current_order = order
  }

  public closeOrderDetails() {
    this.display_details = false
  }

  public closeOrderNote() {
    this.display_note = false
  }

  public onStatusChange() {
    this.router.navigate(['/my-orders/1'], {queryParams: {status: this.status.toLowerCase()}});
  }

  private extractState(orders$: Observable<ResponseObject>) {
    orders$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.orders = <Array<OutputOrder>>response.data.content
        this.total_pages = <number>response.data.totalPages
        this.total_orders = <number>response.data.totalElements
      },
      error: () => {
        return null
      }
    })

  }

}
