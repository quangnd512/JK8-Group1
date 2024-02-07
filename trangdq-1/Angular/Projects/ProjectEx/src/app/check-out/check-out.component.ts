import {Component} from '@angular/core';
import {ErrorMessage, Item, OrderDTO, OutputCartItem, PHONE_PATTERN, TakeUntilDestroy} from "../shared/resources";
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
  public cartItems: Array<OutputCartItem> = []
  public totalPrice: number = 0
  public data: OrderDTO = {
    items: [],
    paymentMethod: 'Cash',
    userName: '',
    userPhone: '',
    addressToReceive: '',
    voucherChosen: 0, // just ignore
    message: ''
  }
  public displayBill: boolean = false
  public errors: Array<ErrorMessage> = []

  constructor(private userService: UserService, private cartService: ShoppingCartService, private orderService: OrderService, private router: Router) {
    super()
  }

  public ngOnInit() {
    this.cartItems = JSON.parse(<string>localStorage.getItem("cartItems"))
    this.totalPrice = Number.parseInt(<string>localStorage.getItem("totalPrice"))
    this.data = {
      items: [],
      paymentMethod: 'Cash',
      userName: '',
      userPhone: '',
      addressToReceive: '',
      voucherChosen: 0, // just ignore
      message: ''
    }
    if (localStorage.getItem('role') === "ROLE_ADMIN") {
      this.userService.getUserById(Number.parseInt(<string>localStorage.getItem("userId"))).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.data.userName = response.name ? response.name : response.username
            this.data.userPhone = response.phone
            this.data.addressToReceive = response.address
            console.log("User's information gotten!")
          },
          error: (error) => {
            alert("Cannot retrieve your account. Please come back later...")
          }
        })
    } else {
      this.userService.getCustomerById(Number.parseInt(<string>localStorage.getItem("userId"))).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.data.userName = response.name ? response.name : response.username
            this.data.userPhone = response.phone
            this.data.addressToReceive = response.address
            console.log("User's information gotten!")
          },
          error: () => {
            alert("Cannot retrieve your account. Please come back later...")
          }
        })
    }
    // TODO: future
    // this.vouchers = []
  }

  public billPopUp() {
    if (this.validateData()) {
      this.displayBill = true
    }
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
    this.data.items = itemsToCheckout;
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
            this.router.navigate(['/my-orders/1'])
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

  private validateData(): boolean {
    let should: boolean = true
    this.errors = [{}, {}, {}]

    if (this.data) {
      if (!this.data.userName.trim()) {
        this.errors[0].message = "*Receiver is required.";
        should = false;
      }
      if (!this.data.userPhone.match(PHONE_PATTERN)) {
        this.errors[1].message = "*Invalid phone number.";
        should = false;
      }
      if (!this.data.addressToReceive.trim()) {
        this.errors[2].message = "*Address is required.";
        should = false;
      }
    }
    return should
  }
}
