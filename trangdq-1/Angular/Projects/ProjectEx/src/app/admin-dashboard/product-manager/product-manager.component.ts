import {Component} from '@angular/core';
import {ErrorMessage, Product, ProductDTO, TakeUntilDestroy} from "../../shared/resources";
import {Observable, takeUntil} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrl: './product-manager.component.scss'
})
export class ProductManagerComponent extends TakeUntilDestroy {
  public page: number = 0
  public products$: Observable<Array<Product>> = new Observable<Array<Product>>()
  public total_products$: Observable<number> = new Observable<number>()
  public images: string = ''
  public productInput: ProductDTO = {
    name: '',
    price: 0,
    description: '',
    inStock: 0,
    images: [],
    category: 'Comic',
    discount: 0
  }
  public current: "dashboard" | "add" | "update" = "dashboard"
  public errors: Array<ErrorMessage> = []
  private id: number = 0;

  constructor(private authService: AuthService, private productService: ProductService) {
    super()
  }

  public ngOnInit(): void {
    this.products$ = this.productService.getProducts(this.page)
    this.total_products$ = this.productService.getTotalProducts()
    this.current = "dashboard"
  }

  public addProductPopUp(): void {
    this.productInput = {
      name: '',
      price: 0,
      description: '',
      inStock: 0,
      images: [],
      category: 'Comic',
      discount: 0
    }
    this.current = "add"
  }

  public updateProductPopUp(id: number) {
    this.productService.getProductById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (product) => {
          console.log(product)
          this.id = product.id
          this.productInput.name = product.name
          this.productInput.description = product.description
          this.productInput.price = product.price
          this.productInput.category = product.category
          this.productInput.discount = product.discount
          this.productInput.inStock = product.inStock
          this.images = product.images.join(' ')
        },
        error: (error) => console.error(error)
      })
    this.current = "update"
  }

  public returnToDashboard(): void {
    this.current = "dashboard"
  }

  public addProduct() {
    if (this.validateData()) {
      this.productService.addProduct(this.productInput)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.returnToDashboard()
            this.updateState()
          },
          error: (error) => {
            console.error(error);
          }
        })
    }
  }

  public updateProduct() {
    if (this.validateData()) {
      let product = {
        id: this.id,
        name: this.productInput.name,
        description: this.productInput.description,
        price: Number(this.productInput.price),
        inStock: Number(this.productInput.inStock),
        discount: Number(this.productInput.discount),
        category: this.productInput.category,
        images: this.images.split(' ')
      }
      this.productService.updateProduct(product)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.returnToDashboard()
            this.updateState()
          },
          error: (error) => {
            console.error(error);
          }
        })
    }
  }

  public deleteProduct(id: number) {
    let choice: boolean = confirm("Delete this product?")
    if (choice) {
      this.productService.deleteProduct(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.updateState()
          },
          error: (error) => {
            console.error(error);
          }
        });
    }
  }

  private updateState() {
    this.products$ = this.productService.getProducts(this.page);
    this.total_products$ = this.productService.getTotalProducts()
  }

  private validateData(): boolean {
    let should: boolean = true
    this.errors = [{}, {}, {}, {}, {}, {}]
    if (this.images.trim()) {
      this.productInput.images = this.images.trim().split(' ') as Array<string>
    } else {
      this.productInput.images = []
    }

    if (this.productInput) {
      if (!this.productInput.name.trim()) {
        this.errors[0].message = "*Name is required.";
        should = false;
      }
      if (!this.productInput.description.trim()) {
        this.errors[1].message = "*Description is required.";
        should = false;
      }
      if (this.productInput.price < 0) {
        this.errors[2].message = "*Price should not be less than 0$.";
        should = false;
      }
      if (this.productInput.inStock < 0) {
        this.errors[3].message = "*In-stock products should not be less than 0.";
        should = false;
      }
      if (this.productInput.images.length === 0) {
        this.errors[4].message = "*Images is required.";
        should = false;
      }
      if (this.productInput.discount < 0) {
        this.errors[5].message = "*Discount should not less than 0%.";
        should = false;
      }
    }
    return should
  }
}
