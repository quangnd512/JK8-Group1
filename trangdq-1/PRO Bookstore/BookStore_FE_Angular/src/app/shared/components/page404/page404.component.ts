import {Component, Input} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, takeUntil} from "rxjs";
import {OrderService} from "../../services/order.service";
import {TakeUntilDestroy} from "../../resources";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.scss'
})
export class Page404Component extends TakeUntilDestroy {
  @Input()
  public title = 'Page Not Found'
  @Input()
  public message = "Seems like you've stumbled upon a page that doesn't exist."
  @Input()
  public imageLink = 'assets/sad-meme.jpg'

  constructor(private route: ActivatedRoute, private orderService: OrderService, private cartService: ShoppingCartService, private router: Router) {
    super()
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadState()
    });
  }

  ngOnInit() {
    this.loadState()
  }

  public loadState() {
    if (this.route.snapshot.routeConfig?.path === 'success') {
      this.imageLink = 'assets/success.webp'
      this.message = 'You have completed the order. Check Order History.'
      this.title = 'Order Completed!'
      let dataToCheckout = localStorage.getItem("dataToCheckout")
      if (dataToCheckout) { // available when paid by PayPal
        this.orderService.checkout(JSON.parse(dataToCheckout)).pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              if (localStorage.getItem("isFromCart") === "true") {
                this.cartService.deleteAllItems().pipe(takeUntil(this.destroy$))
                  .subscribe({
                    next: (response) => {
                      console.log("Cart refreshed!")
                      localStorage.removeItem("dataToCheckout")
                      localStorage.removeItem("isFromCart")
                      localStorage.removeItem("cartItems")
                      localStorage.removeItem("totalPrice")
                      alert("Checkout successfully!")

                    },
                    error: (error) => {
                      console.error(error.message)
                    }
                  })
              } else {
                localStorage.removeItem("dataToCheckout")
                localStorage.removeItem("item")
                localStorage.removeItem("price")
                alert("Checkout successfully!")
              }
            },
            error: (error) => {
              alert("Cannot checkout this time. Please come back later...")
            }
          })
      }
    } else if (this.route.snapshot.routeConfig?.path === 'cancel') {
      this.imageLink = 'assets/cancel.jpg'
      this.message = 'The order is temporarily ceased.'
      this.title = 'Order Failed...'
    }
  }
}
