import {Component} from '@angular/core';
import {AuthService} from '../shared/services/auth/auth.service';
import {Observable} from 'rxjs';
import {ProductService} from '../shared/services/product/product.service';
import {ErrorMessage, Product, ProductDTO} from '../shared/defined';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})

export class AdminDashboardComponent {
  public page: number = 0
  public isAdmin$: Observable<boolean> = new Observable<boolean>()
  public products$: Observable<Array<Product>> = new Observable<Array<Product>>()
  public productInput: ProductDTO = {
    name: '',
    price: 0,
    description: '',
    inStock: 0,
    images: [],
    category: 'Comic',
    discount: 0
  }
  public images: string = ''
  public current: "dashboard" | "add" | "update" = "dashboard"
  public errors: Array<ErrorMessage> = []
  public total_products$: Observable<number> = new Observable<number>()

  private id: number = 0;

  constructor(private authService: AuthService, private productService: ProductService) {
  }

  public ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin()
    this.products$ = this.productService.getProducts()
    this.total_products$ = this.productService.getTotalProducts()
    this.current = "dashboard"
  }

  public addProductPopUp(): void {
    this.current = "add"
  }

  public async updateProductPopUp(id: number): Promise<void> {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.id = product.id
        this.productInput.name = product.name
        this.productInput.description = product.description
        this.productInput.price = product.price
        this.productInput.category = product.category
        this.productInput.discount = product.discount
        this.productInput.inStock = product.inStock
        this.images = product.images.join(' ')
      },
      error: (error) => {
        console.error(error);
      }
    })
    this.current = "update"
  }

  public returnToDashboard(): void {
    this.current = "dashboard"
  }

  public async addProduct() {
    if (this.validateData()) {
      this.productService.addProduct(this.productInput).subscribe({
        next: () => {
          this.returnToDashboard()
          this.products$ = this.productService.getProducts(this.page);
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }

  public async updateProduct() {

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
        .subscribe({
          next: () => {
            this.returnToDashboard()
            this.products$ = this.productService.getProducts(this.page);
          },
          error: (err) => {
            console.error(err);
          }
        })
    }
  }

  public async deleteProduct(id: number) {
    let choice: boolean = confirm("Delete this product?")
    if (choice) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products$ = this.productService.getProducts(this.page);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  private validateData(): boolean {
    let should: boolean = true
    this.errors = [{}, {}, {}, {}, {}, {}, {}]
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
      if (!this.productInput.category.trim()) {
        this.errors[5].message = "*Category is required.";
        should = false;
      }
      if (this.productInput.discount < 0) {
        this.errors[6].message = "*Discount should not less than 0%.";
        should = false;
      }
    }
    return should
  }
}
