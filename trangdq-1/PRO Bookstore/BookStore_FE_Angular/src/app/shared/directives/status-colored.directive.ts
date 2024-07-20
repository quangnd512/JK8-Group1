import {Directive, ElementRef, Input, SimpleChanges} from '@angular/core';
import {OrderStatus} from "../resources";

@Directive({
  selector: '[appStatusColored]'
})
export class StatusColoredDirective {
  @Input()
  public status: OrderStatus | null = null

  constructor(private el: ElementRef) {
  }

  public ngOnInit(): void {
    this.loadState()
  }

  public loadState() {
    this.el.nativeElement.style.paddingRight = '5px'
    switch (true) {
      case (this.status === OrderStatus.CUSTOMER_CONFIRMED):
        this.el.nativeElement.style.color = '#337ab7'
        break
      case (this.status === OrderStatus.ADMIN_PREPARING):
        this.el.nativeElement.style.color = '#ffc400'
        break
      case (this.status === OrderStatus.SHIPPING):
        this.el.nativeElement.style.color = '#00D1FF'
        break
      case (this.status === OrderStatus.CUSTOMER_REQUEST_CANCEL):
        this.el.nativeElement.style.color = '#ff0000'
        break
      case (this.status === OrderStatus.SUCCESS):
        this.el.nativeElement.style.color = '#44a131'
        break
      case (this.status === OrderStatus.CANCELED):
        this.el.nativeElement.style.color = '#bbb'
        break
      default:
        break
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['status']) {
      this.loadState();
    }
  }
}
