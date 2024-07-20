import {Component} from '@angular/core';
import {OrderStatus, OutputOrder, ResponseObject, TakeUntilDestroy} from "../../shared/resources";
import {OrderService} from "../../shared/services/order.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Observable, takeUntil} from "rxjs";

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrl: './order-manager.component.scss'
})
export class OrderManagerComponent extends TakeUntilDestroy {
  public orders: Array<OutputOrder> = []
  public total_orders: number = 0
  public total_pages: number = 0
  public status: string = OrderStatus.CUSTOMER_CONFIRMED
  public page: number = 1
  public display_details: boolean = false
  public display_note: boolean = false
  public current_order: OutputOrder | undefined
  protected readonly OrderStatus = OrderStatus;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) {
    super()
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.reloadState()
    });
  }

  public ngOnInit() {
    this.reloadState()
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

  private extractState(orders$: Observable<ResponseObject>) {
    orders$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.orders = <Array<OutputOrder>>response.data.content
        this.total_orders = <number>response.data.totalElements
        this.total_pages = <number>response.data.totalPages
      },
      error: () => {
        return null
      }
    })

  }

  private reloadState() {
    this.page = Number.parseInt(<string>this.route.snapshot.paramMap.get('page'))
    this.getOrdersByStatus()
  }

  private getOrdersByStatus() {
    let st = <string>(this.route.snapshot.queryParamMap.get('status')?.toUpperCase())
    this.status = st ? st : OrderStatus.CUSTOMER_CONFIRMED
    this.extractState(this.orderService.getOrdersByStatus(this.status, this.page - 1))
  }
}
