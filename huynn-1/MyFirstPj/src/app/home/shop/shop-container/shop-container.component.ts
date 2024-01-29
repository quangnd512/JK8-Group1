import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {HomeHeaderComponent} from "../../home-header/home-header.component";
import {HomeFooterComponent} from "../../home-footer/home-footer.component";
import {HomeHeaderMainComponent} from "../../home-header-main/home-header-main.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ShopAllBookComponent} from "../shop-all-book/shop-all-book.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BookServices} from "../../../services/bookServices";
import {ShopBookByTypeComponent} from "../shop-book-by-type/shop-book-by-type.component";
import {BookType} from "../../../services/constants/book-type";

@Component({
  selector: 'app-shop-container',
  standalone: true,
  imports: [
    HomeHeaderComponent,
    HomeFooterComponent,
    HomeHeaderMainComponent,
    MatPaginatorModule,
    ShopAllBookComponent,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    BookServices
  ],
  templateUrl: './shop-container.component.html',
  // styleUrl: './shop-container.component.scss'
  styleUrls: ['../../../home/home.component.scss']
})
export class ShopContainerComponent implements OnInit{

  @ViewChild('productList', {
    read: ViewContainerRef,
    static: true
  })
  productListContainer: ViewContainerRef | undefined;

  currentPage: number = 0;

  pageSize: number = 10;

  selectedSortOption: string = 'Tên sách';

  getByType: string = '';

  constructor() {
  }

  ngOnInit() {
    this.addAllBookComponent()
  }

  addAllBookComponent() {
    this.productListContainer?.clear();
    const componentRef = this.productListContainer?.createComponent(ShopAllBookComponent);
    if (componentRef) {
      const instance: ShopAllBookComponent = componentRef.instance;
      instance.selectedSortOption = this.selectedSortOption;
    }
  }

  addAllBookByType(type: string) {
    this.productListContainer?.clear();
    const componentRef = this.productListContainer?.createComponent(ShopBookByTypeComponent);
    if (componentRef) {
      const instance: ShopBookByTypeComponent = componentRef.instance;
      instance.selectedSortOption = this.selectedSortOption;
      instance.sortByType = type;
    }
  }

  protected readonly BookType = BookType;
}
