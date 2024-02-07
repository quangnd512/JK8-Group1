import {Component} from '@angular/core';
import {Observable, takeUntil} from "rxjs";
import {Item, OutputCartItem, TakeUntilDestroy} from "../shared/resources";
import {ShoppingCartService} from "../shared/services/shopping-cart.service";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent extends TakeUntilDestroy {
  public isLoggedIn$: Observable<boolean> = new Observable<boolean>()
  public cartItems: Array<OutputCartItem> = [];
  public totalPrice: number = 0;

  constructor(private cartService: ShoppingCartService, private authService: AuthService, private router: Router) {
    super();
  }

  public ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn()
    this.getCartItems()
  }

  public toCheckout() {
    this.saveToLocalStorage()
    localStorage.setItem("isFromCart", "true")

    let items: Array<Item> = []
    this.cartItems.forEach((item) => {
      items.push({productId: item.productId, quantity: item.quantity})
    })

    this.cartService.updateCart(items).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        console.log(response.message)
        this.router.navigate(['/checkout']);
      },
      error: (error) => {
        console.log(error.message)
      }
    })
  }

  public handleIncrement(item: OutputCartItem) {
    if (item.quantity < item.inStock)
      this.updateItem(item.productId, item.quantity + 1)
  }

  public handleDecrement(item: OutputCartItem) {
    if (item.quantity > 1) {
      this.updateItem(item.productId, item.quantity - 1);
    } else {
      this.deleteItem(item)
    }
  }

  // if ls presents: get from ls
  // else: get from api
  private getCartItems() {
    if (localStorage.getItem("totalPrice") && localStorage.getItem("cartItems")) {
      this.cartItems = JSON.parse(<string>localStorage.getItem("cartItems"))
      this.totalPrice = Number.parseInt(<string>localStorage.getItem("totalPrice"))
    } else {
      this.cartService.getCartItems().pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.cartItems = response
            this.totalPrice = 0
            this.cartItems.forEach(item => {
              this.totalPrice += (item.price - item.price * item.discount / 100) * item.quantity;
            })
            console.log("getCartItems()")
          },
          error: error => {
            console.error(error.message)
          }
        })
    }
  }

  // update display: item quantity, total price
  // save to ls
  private updateItem(productId: number, quantity: number) {
    let item: OutputCartItem | undefined = this.cartItems.filter((item) => item.productId === productId).at(0)
    if (item) {
      if (item.quantity > quantity) {
        this.totalPrice -= (item.price - item.price * item.discount / 100)
      } else {
        this.totalPrice += (item.price - item.price * item.discount / 100)
      }
      item.quantity = quantity;
    }
    this.saveToLocalStorage()
    console.log("updateItem()")
  }

  // delete display: item
  // update display: total price
  // save to ls
  private deleteItem(item: OutputCartItem): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== item.productId)
    this.totalPrice -= (item.price - item.price * item.discount / 100)
    this.saveToLocalStorage()
    console.log("deleteItem()")
  }

  // save to ls: items, total price
  private saveToLocalStorage() {
    localStorage.setItem("totalPrice", String(this.totalPrice))
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    console.log("saveToLocalStorage()")
  }

}
