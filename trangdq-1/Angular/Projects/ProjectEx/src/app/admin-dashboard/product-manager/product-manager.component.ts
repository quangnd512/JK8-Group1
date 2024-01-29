import {Component, ElementRef, ViewChild} from '@angular/core';
import {ErrorMessage, Product, TakeUntilDestroy} from "../../shared/resources";
import {Observable, takeUntil} from "rxjs";
import {ProductService} from "../../shared/services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrl: './product-manager.component.scss'
})
export class ProductManagerComponent extends TakeUntilDestroy {
  public page: number = 1
  public products$: Observable<Array<Product>> = new Observable<Array<Product>>()
  public total_products$: Observable<number> = new Observable<number>()
  public current: "dashboard" | "add" | "update" = "dashboard"
  public errors: Array<ErrorMessage> = []
  public loading: boolean = false

  @ViewChild('imageInput') public imageInputElement?: ElementRef
  public images: Array<File> = []
  public imagesPreview: Array<string> = []
  public formData: FormData = new FormData();
  public productInput: Product = {
    name: '',
    price: 0,
    description: '',
    inStock: 0,
    discount: 0,
    category: 'Comic',
    images: []
  }
  private id: number = 0;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    super()
  }

  public ngOnInit(): void {
    let pageNo = this.route.snapshot.paramMap.get('page')
    if (pageNo) {
      this.page = Number.parseInt(pageNo)
    }
    this.current = "dashboard"
    this.updateState()
  }

  public addProductPopUp(): void {
    this.id = 0
    this.productInput = {
      name: '',
      price: 0,
      description: '',
      inStock: 0,
      discount: 0,
      category: 'Comic',
      images: []

    }
    this.images = []
    this.formData = new FormData()
    this.imagesPreview = []
    this.current = "add"
  }

  public updateProductPopUp(id: number = 0): void {
    this.productService.getProductById(id).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (product) => {
          this.productInput.name = product.name
          this.productInput.description = product.description
          this.productInput.price = product.price
          this.productInput.category = product.category
          this.productInput.discount = product.discount
          this.productInput.inStock = product.inStock
          this.productInput.images = product.images
          this.id = product.id ? product.id : 0
        },
        error: (error) => alert(error.message)
      })
    this.images = []
    this.formData = new FormData()
    this.imagesPreview = []
    this.current = "update"
  }

  public returnToDashboard(): void {
    this.current = "dashboard"
  }

  public deleteImageFromModal(index: number): void {
    this.productInput.images.splice(index, 1);
  }

  public deleteImageFromInput(index: number): void {
    // this.images.splice(index,1)
    this.images = this.deleteElement(this.images, index)
    this.imagesPreview.splice(index, 1)
  }

  public onBrowseImages(): void {
    this.images = this.imageInputElement?.nativeElement?.files
    if (this.images.length > 0) {
      for (let image of this.images) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.imagesPreview.push(event.target.result);
        }
        reader.readAsDataURL(image)
      }
    }
  }

  public addProduct(): void {
    if (this.validateData()) {
      this.productService.addProduct(this.productInput).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            for (const image of this.images) {
              this.formData.append('images', image, image.name);
            }
            this.loading = true
            this.productService.uploadImages(response.data.id, this.formData).pipe(takeUntil(this.destroy$)).subscribe({
              next: () => {
                this.loading = false
                alert(response.message)
                this.returnToDashboard()
                this.updateState()
              },
              error: (error) => {
                this.loading = false
                alert(error.message)
                this.returnToDashboard()
                this.updateState()
              }
            })
          },
          error: (error) => {
            alert(error.message)
            this.returnToDashboard()
          }
        })
    }
  }

  public updateProduct(): void {
    if (this.validateData()) {
      this.productService.updateProduct(this.id, this.productInput).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          if (this.images.length !== 0) {
            for (const image of this.images) {
              this.formData.append('images', image, image.name);
            }
            this.loading = true
            this.productService.uploadImages(this.id, this.formData).pipe(takeUntil(this.destroy$))
              .subscribe({
                next: () => {
                  this.loading = false
                  alert(response.message)
                  this.updateState()
                  this.returnToDashboard()
                },
                error: (error) => {
                  this.loading = false
                  alert(error.message)
                  this.updateState()
                  this.returnToDashboard()
                }
              })
          } else {
            alert(response.message)
            this.updateState()
            this.returnToDashboard()
          }
        },
        error: (error) => {
          alert(error.message)
          this.returnToDashboard()
        }
      })
    }
  }

  public deleteProduct(id: number = 0): void {
    let choice: boolean = confirm("Delete this product?")
    if (choice) {
      this.loading = true
      this.productService.deleteProduct(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.loading = false
            alert(response.message)
            this.updateState()
          },
          error: (error) => {
            this.loading = true
            alert(error.message)
          }
        });
    }
  }

  public updateState(): void {
    this.products$ = this.productService.getProducts(this.page - 1);
    this.total_products$ = this.productService.getTotalProducts()
  }

  private deleteElement(clone: Array<File>, index: number) {
    let list: Array<File> = []
    for (let i = 0; i < clone.length; i++) {
      if (index !== i) {
        list.push(clone[i])
      }
    }
    return list
  }

  private validateData(): boolean {
    let should: boolean = true
    this.errors = [{}, {}, {}, {}, {}, {}]

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
      if (this.productInput.discount < 0) {
        this.errors[4].message = "*Discount should not less than 0%.";
        should = false;
      }
      if (this.productInput.images.length === 0 && this.images.length === 0) {
        this.errors[5].message = "*Images is required.";
        should = false;
      }
    }
    return should
  }


}
