import {Component, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef} from '@angular/core';
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
import {CommonModule} from "@angular/common";

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
    HttpClientModule,
    CommonModule
  ],
  providers: [
    BookServices
  ],
  templateUrl: './shop-container.component.html',
  // styleUrl: './shop-container.component.scss'
  styleUrls: ['../../../home/home.component.scss']
})
export class ShopContainerComponent implements OnInit {

  @ViewChild('productList', {
    read: ViewContainerRef,
    static: true
  })
  productListContainer: ViewContainerRef | undefined;

  pageSize: number = 10;

  selectedSortOption: string = 'Tên sách';

  protected readonly BookType = BookType;

  isAllBookSelected = false;

  isAllShortStorySelected = false;

  isAllNovelSelected = false;

  isAllPoemSelected = false;

  constructor() {
  }

  ngOnInit() {
    const booktype = localStorage.getItem("bookType");
    if (booktype === BookType.THO || booktype === BookType.TRUYEN_NGAN || booktype === BookType.TIEU_THUYET) {
      this.addAllBookByType(booktype);
    } else {
      this.addAllBookComponent()
    }
  }

  addAllBookComponent() {
    this.isAllBookSelected = false;
    this.isAllPoemSelected = false;
    this.isAllShortStorySelected = false;
    this.isAllNovelSelected = false;
    if (localStorage.getItem("bookType")) {
      localStorage.removeItem("bookType");
    }
    this.productListContainer?.clear();
    const componentRef = this.productListContainer?.createComponent(ShopAllBookComponent);
    if (componentRef) {
      const instance: ShopAllBookComponent = componentRef.instance;
      instance.selectedSortOption = this.selectedSortOption;
    }
    this.isAllBookSelected = true;
  }

  addAllBookByType(type: string) {
    this.isAllBookSelected = false;
    this.isAllPoemSelected = false;
    this.isAllShortStorySelected = false;
    this.isAllNovelSelected = false;
    this.productListContainer?.clear();
    const componentRef = this.productListContainer?.createComponent(ShopBookByTypeComponent);
    if (componentRef) {
      const instance: ShopBookByTypeComponent = componentRef.instance;
      instance.selectedSortOption = this.selectedSortOption;
      instance.sortByType = type;
    }
    if (type == BookType.TIEU_THUYET) {
      this.isAllNovelSelected = true;
      localStorage.setItem("bookType", BookType.TIEU_THUYET);
    } else if (type == BookType.THO) {
      this.isAllPoemSelected = true;
      localStorage.setItem("bookType", BookType.THO);
    } else {
      this.isAllShortStorySelected = true;
      localStorage.setItem("bookType", BookType.TRUYEN_NGAN);
    }
  }

}
