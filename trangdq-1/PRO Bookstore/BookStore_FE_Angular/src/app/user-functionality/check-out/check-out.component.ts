import {Component} from '@angular/core';
import {
  ErrorMessage,
  getRole,
  getUserId,
  Item,
  OrderDTO,
  OutputCartItem,
  PHONE_PATTERN,
  TakeUntilDestroy,
  Voucher
} from "../../shared/resources";
import {takeUntil} from "rxjs";
import {UserService} from "../../shared/services/user.service";
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {Router} from "@angular/router";
import {OrderService} from "../../shared/services/order.service";
import {VoucherService} from "../../shared/services/voucher.service";

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
    voucherId: -1,
    message: ''
  }
  public displayBill: boolean = false
  public vouchers: Array<Voucher> = []
  public errors: Array<ErrorMessage> = []
  public newTotalPrice: number = 0
  public voucherSelected: Voucher | null = null

  constructor(private userService: UserService,
              private cartService: ShoppingCartService,
              private orderService: OrderService,
              private voucherService: VoucherService,
              private router: Router) {
    super()
  }

  public ngOnInit() {
    if (localStorage.getItem("isFromCart")) {
      this.cartItems = JSON.parse(<string>localStorage.getItem("cartItems"))
      this.totalPrice = Number.parseInt(<string>localStorage.getItem("totalPrice"))
      this.newTotalPrice = this.totalPrice
    } else {
      this.cartItems = JSON.parse(<string>localStorage.getItem("item"))
      this.totalPrice = Number.parseInt(<string>localStorage.getItem("price"))
      this.newTotalPrice = this.totalPrice
    }
    this.data = {
      items: [],
      paymentMethod: 'Cash',
      userName: '',
      userPhone: '',
      addressToReceive: '',
      voucherId: -1,
      message: ''
    }
    if (getRole() === "ROLE_ADMIN") {
      this.userService.getUserById(parseInt(getUserId())).pipe(takeUntil(this.destroy$))
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
    this.voucherService.getVouchersByUserId().pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.vouchers = response
          console.log("Vouchers gotten!")
        },
        error: (error) => {
          console.log(error)
        }
      })
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
    this.data.voucherId = this.voucherSelected ? this.voucherSelected.id : -1
    if (this.data.paymentMethod === "Cash") {
      this.orderService.checkout(this.data).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (localStorage.getItem("isFromCart") === "true") {
              this.cartService.deleteAllItems().pipe(takeUntil(this.destroy$))
                .subscribe({
                  next: (response) => {
                    console.log("Cart refreshed!")
                    localStorage.removeItem("isFromCart")
                    localStorage.removeItem("cartItems")
                    localStorage.removeItem("totalPrice")
                    alert("Checkout successfully!")
                    this.router.navigate(['/success'])

                  },
                  error: (error) => {
                    console.error(error.message)
                  }
                })
            } else {
              localStorage.removeItem("item")
              localStorage.removeItem("price")
              alert("Checkout successfully!")
              this.router.navigate(['/success'])
            }
          },
          error: (error) => {
            alert("Cannot checkout this time. Please come back later...")
          }
        })
    } else if (this.data.paymentMethod === "Paypal") {
      this.orderService.payByPaypal(this.totalPrice).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log("Confirmed payment by Paypal!")
            localStorage.setItem("dataToCheckout", JSON.stringify(this.data))
            alert("Redirect to payment page: " + response.data[1].href)
            window.location = response.data[1].href;
          },
          error: (error) => {
            alert("Error: " + error.message)
          }
        })
    }
  }

  public closeBill() {
    this.displayBill = false
  }

  public handleVoucherSelect() {
    if (this.voucherSelected && this.voucherSelected?.rate) {
      if (new Date(<string><unknown>this.voucherSelected.dueDate).valueOf() < Date.now().valueOf()) {
        alert("Outdated voucher detected!")
        this.voucherService.deleteVoucher(this.voucherSelected.id).pipe(takeUntil(this.destroy$)).subscribe({
          next: () => {
            console.log('Deleted outdated voucher.')
          },
          error: () => {
            console.log('Failed to delete voucher.')
          }
        })
        this.vouchers = this.vouchers.filter((voucher) => voucher.id !== this.voucherSelected?.id)
        this.voucherSelected = null
      } else {
        this.newTotalPrice = this.totalPrice - this.totalPrice * this.voucherSelected?.rate / 100
      }
    } else {
      this.newTotalPrice = this.totalPrice
    }
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
