import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {ListBookResponse} from "../../../services/interfaces/book/listBookResponse.interface";
import {HomeServices} from "../../../services/homeServices";
import {BookServices} from "../../../services/bookServices";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {TruncatePipe} from "../../../pipes/TruncatePipe";
import {MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-shop-all-book',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    TruncatePipe,
    MatPaginatorModule
  ],
  providers: [
    BookServices
  ],
  templateUrl: './shop-all-book.component.html',
  styleUrls: ['../../../home/home.component.scss']
})
export class ShopAllBookComponent implements OnInit, OnChanges {

  private router = inject(Router);

  public listAllBooks: ListBookResponse[] = [];

  currentPage: number = 0;

  pageSize: number = 10;

  @Input()
  selectedSortOption: string = '';

  sortBy: string = '';

  constructor(
    private bookServices: BookServices) {

  }

  ngOnInit(): void {
    this.getBooks()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedSortOption'].currentValue != changes['selectedSortOption'].previousValue) {
      if (this.selectedSortOption == "Tên sách") {
        this.sortBy = 'tenSach';
      }
      if (this.selectedSortOption == "Ngày xuất bản") {
        this.sortBy = 'ngayXuatBan';
      }
      if (this.selectedSortOption == "Giá tiền") {
        this.sortBy = 'giaTien';
      }
      this.getBooks();
    }
  }

  private getBooks() {
    this.bookServices.GetBookPagination(this.currentPage, this.sortBy, this.pageSize).subscribe({
      next: value => {
        this.listAllBooks = value.content;
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getBooks();
  }

  public navigateToBookDetail(bookId: any) {
    this.router.navigate(['/home/book-detail', {bookId: bookId}]);
  }
}
