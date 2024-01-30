import {Component} from '@angular/core';
import {CartItem, Item, OrderDTO, TakeUntilDestroy} from "../shared/resources";
import {takeUntil} from "rxjs";
import {UserService} from "../shared/services/user.service";
import {ShoppingCartService} from "../shared/services/shopping-cart.service";
import {Router} from "@angular/router";
import {OrderService} from "../shared/services/order.service";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent extends TakeUntilDestroy {
  public cartItems: Array<CartItem> = []
  public totalPrice: number = 0
  public data: OrderDTO = {
    cartItems: [],
    paymentMethod: 'Cash',
    customerName: '',
    customerPhone: '',
    addressToReceive: '',
    voucherChosen: 0, // just ignore
    messageOfCustomer: ''
  }
  public displayBill: boolean = false

  constructor(private userService: UserService, private cartService: ShoppingCartService, private orderService: OrderService, private router: Router) {
    super()
  }

  public ngOnInit() {
    this.cartItems = JSON.parse(<string>localStorage.getItem("cartItems"))
    this.totalPrice = Number.parseInt(<string>localStorage.getItem("totalPrice"))
    this.data = {
      cartItems: [],
      paymentMethod: 'Cash',
      customerName: '',
      customerPhone: '',
      addressToReceive: '',
      voucherChosen: 0, // just ignore
      messageOfCustomer: ''
    }
    this.userService.getUserById(Number.parseInt(<string>localStorage.getItem("userId"))).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.data.customerName = response.name ? response.name : response.username
          this.data.customerPhone = response.phone
          this.data.addressToReceive = response.address
          console.log("User's information gotten!")
        },
        error: () => {
          alert("Cannot retrieve your account. Please come back later...")
        }
      })
    // TODO: future
    // this.vouchers = []
  }

  public billPopUp() {
    this.displayBill = true
  }

  public checkout() {
    const itemsToCheckout: Array<Item> = []
    for (let cartItem of this.cartItems) {
      const item: Item = {
        productId: cartItem.productId,
        quantity: cartItem.quantity
      }
      itemsToCheckout.push(item)
    }
    this.data.cartItems = itemsToCheckout;
    if (this.data.paymentMethod === "Cash") {
      this.orderService.checkout(this.data).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (localStorage.getItem("fromCart") === "true") {
              this.cartService.deleteAllItems().pipe(takeUntil(this.destroy$))
                .subscribe({
                  next: (response) => {
                    console.log("Cart refreshed!")
                    localStorage.removeItem("isFromCart")
                    localStorage.removeItem("cartItems")
                    localStorage.removeItem("totalPrice")
                    this.router.navigate(['/home/1'])
                  },
                  error: (error) => {
                    console.error(error.message)
                  }
                })
            }
            alert("Checkout successfully!")
            this.router.navigate(['/my-orders'])
          },
          error: (error) => {
            alert("Cannot checkout this time. Please come back later...")
          }
        })
    } else if (this.data.paymentMethod === "Paypal") {
      // TODO future
    }
  }

  public closeBill() {
    this.displayBill = false
  }
}
