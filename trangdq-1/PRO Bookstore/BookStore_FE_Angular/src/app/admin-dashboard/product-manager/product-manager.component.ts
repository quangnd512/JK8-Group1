import {Component, ElementRef, ViewChild} from '@angular/core';
import {ErrorMessage, Product, ResponseObject, TakeUntilDestroy} from "../../shared/resources";
import {concatWith, filter, last, Observable, of, takeUntil, tap} from "rxjs";
import {ProductService} from "../../shared/services/product.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrl: './product-manager.component.scss'
})
export class ProductManagerComponent extends TakeUntilDestroy {
  public page: number = 1
  public products: Array<Product> = []
  public total_products: number = 0
  public total_pages: number = 0
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

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    super()
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadState()
    });
  }

  public ngOnInit(): void {
    this.loadState()
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
          console.log("Product's information gotten!")
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
    let imageUpdated = this.imageInputElement?.nativeElement?.files
    if (imageUpdated.length > 0) {
      for (let image of imageUpdated) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.imagesPreview.push(event.target.result);
          this.images.push(image)
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
            console.log("Product's information saved!")
            for (const image of this.images) {
              this.formData.append('images', image, image.name);
            }
            this.loading = true
            this.productService.uploadImages(response.data.id, this.formData).pipe(takeUntil(this.destroy$)).subscribe({
              next: () => {
                this.loading = false
                alert(response.message)
                this.returnToDashboard()
                this.loadState()
              },
              error: (error) => {
                this.loading = false
                alert(error.message)
                this.returnToDashboard()
                this.loadState()
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
      if (this.images.length !== 0) {
        for (const image of this.images) {
          this.formData.append('images', image, image.name);
        }
      }
      this.loading = true;
      let completions = 0

      this.productService.updateProduct(this.id, this.productInput).pipe(
        concatWith(this.images.length !== 0 ? this.productService.uploadImages(this.id, this.formData) : of(null)),
        tap(_ => completions++),
        last(),
        filter(response => completions === 2),
        takeUntil(this.destroy$),
      ).subscribe({
        next: _ => {
          this.loading = false;
          alert("Product updated and images uploaded successfully!");
          this.loadState();
          this.returnToDashboard();
        },
        error: error => {
          this.loading = false;
          alert(error.message);
          this.loadState();
          this.returnToDashboard();
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
            this.loadState()
          },
          error: (error) => {
            this.loading = true
            alert(error.message)
          }
        });
    }
  }

  private extractState(products$: Observable<ResponseObject>) {
    products$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.products = <Array<Product>>response.data.content
        this.total_pages = <number>response.data.totalPages
        this.total_products = <number>response.data.totalElements
      },
      error: () => {
        return null
      }
    })
  }

  private loadState() {
    this.page = Number.parseInt(<string>this.route.snapshot.paramMap.get('page'))
    this.current = "dashboard"
    this.extractState(this.productService.getProducts(this.page - 1));
    console.log("State updated!")
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
