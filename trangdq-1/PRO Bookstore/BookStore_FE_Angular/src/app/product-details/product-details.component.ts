import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../shared/services/product.service';
import {Observable, takeUntil} from 'rxjs';
import {getUserId, OutputCartItem, Product, TakeUntilDestroy} from '../shared/resources';
import {ShoppingCartService} from "../shared/services/shopping-cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent extends TakeUntilDestroy {
  public product$: Observable<Product> = new Observable<Product>()

  constructor(private productService: ProductService, private cartService: ShoppingCartService, private route: ActivatedRoute, private router: Router) {
    super()
  }

  public ngOnInit(): void {
    let id: number = Number.parseInt(<string>this.route.snapshot.paramMap.get('id')) // cast
    this.product$ = this.productService.getProductById(id) // async
  }

  public addToCart(product: Product): void {
    if (getUserId() && product.id) {
      if (product.inStock) {
        this.cartService.addToCart(product.id).pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              if (localStorage.getItem("cartItems")) {
                let cartItems: Array<OutputCartItem> = JSON.parse(<string>localStorage.getItem("cartItems"))
                let totalPrice: number = Number.parseInt(<string>localStorage.getItem("totalPrice"))
                let item: OutputCartItem = {
                  quantity: 1,
                  productId: product.id!,
                  name: product.name,
                  price: product.price,
                  description: product.description,
                  inStock: product.inStock,
                  images: product.images,
                  category: product.category,
                  discount: product.discount
                }
                cartItems.push(item)
                totalPrice += (product.price - product.price * product.discount / 100) * item.quantity
                localStorage.setItem("totalPrice", String(totalPrice))
                localStorage.setItem("cartItems", JSON.stringify(cartItems))
              }
              console.log("Item added to cart!")
              this.router.navigate(['/my-shopping-cart'])
            },
            error: (error) => console.error(error.message)
          })
      } else {
        alert("Product is out-of-stock! Please come back later!")
      }
    } else {
      this.router.navigate(['/my-shopping-cart'])
    }
  }

  public buyNow = (product: Product): void => {
    const item: OutputCartItem = {
      quantity: 1,
      productId: product.id ? product.id : 0,
      name: product.name,
      price: product.price,
      description: product.description,
      images: product.images,
      inStock: product.inStock,
      category: product.category,
      discount: product.discount
    };
    localStorage.setItem("price", String((product.price - product.price * product.discount / 100) * item.quantity))
    localStorage.setItem("item", JSON.stringify([item]))
    this.router.navigate([`/checkout`])
  }
}
