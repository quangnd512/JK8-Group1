import {Component} from '@angular/core';
import {Observable, takeUntil} from "rxjs";
import {CartItem, TakeUntilDestroy} from "../shared/resources";
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
  public cartItems: Array<CartItem> = [];
  public totalPrice: number = 0;

  constructor(private cartService: ShoppingCartService, private authService: AuthService, private router: Router) {
    super();
  }

  public ngOnInit() {
    this.getItems()
    this.isLoggedIn$ = this.authService.isLoggedIn()
  }

  public handleIncrement(item: CartItem) {
    if (item.quantity < item.inStock)
      this.handleClick(item.productId, item.quantity + 1)
  }

  public handleDecrement(item: CartItem) {
    if (item.quantity > 1) {
      this.handleClick(item.productId, item.quantity - 1);
    } else {
      this.deleteItem(item)
    }
  }

  public toCheckout() {
    localStorage.setItem("totalPrice", String(this.totalPrice))
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    localStorage.setItem("fromCart", "true")
    this.router.navigate(['/checkout']);
  }

  private getItems() {
    this.cartService.getItems().pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.cartItems = response
          this.totalPrice = 0
          this.cartItems.forEach(item => {
            this.totalPrice += (item.price - item.price * item.discount / 100) * item.quantity;
          })
        },
        error: error => {
          console.error(error)
        }
      })
  }

  private handleClick(productId: number, quantity: number): void {
    this.cartService.updateItemQuantity(productId, quantity).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.updateState(productId, quantity)
        },
        error: (error) => {
          console.error(error)
          alert("Cannot change the quantity of item!")
        }
      })
  }

  private deleteItem(item: CartItem): void {
    this.cartService.deleteItem(item.productId).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== item.productId)
          this.totalPrice -= (item.price - item.price * item.discount / 100)
        },
        error: error => {
          alert("Failed to delete item!")
        }
      })

  }

  private updateState(productId: number, quantity: number) {
    for (let item of this.cartItems) {
      if (item.productId === productId) {
        if (item.quantity > quantity) {
          this.totalPrice -= (item.price - item.price * item.discount / 100)
        } else {
          this.totalPrice += (item.price - item.price * item.discount / 100)
        }
        item.quantity = quantity;
        break
      }
    }
  }

}
