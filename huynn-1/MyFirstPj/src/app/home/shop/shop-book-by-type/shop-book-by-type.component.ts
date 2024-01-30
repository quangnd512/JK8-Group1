import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {ListBookResponse} from "../../../services/interfaces/book/listBookResponse.interface";
import {BookServices} from "../../../services/bookServices";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-shop-book-by-type',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatPaginatorModule,
    NgForOf
  ],
  templateUrl: './shop-book-by-type.component.html',
  // styleUrl: './shop-book-by-type.component.scss'
  styleUrls: ['../../../home/home.component.scss']
})

export class ShopBookByTypeComponent implements OnInit, OnChanges{

  private router = inject(Router);

  public listAllBooks: ListBookResponse[] = [];

  currentPage: number = 0;

  pageSize: number = 10;

  @Input()
  selectedSortOption: string = '';

  @Input()
  sortByType: string = '';

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
    this.bookServices.GetBookPaginationByType(this.currentPage, this.sortBy, this.pageSize, this.sortByType).subscribe({
      next: value => {
        this.listAllBooks = value.content;
        console.log(this.listAllBooks)
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
