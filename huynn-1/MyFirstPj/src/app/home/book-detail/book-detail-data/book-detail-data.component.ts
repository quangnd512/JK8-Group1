import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookServices } from '../../../services/bookServices';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Book } from '../../../services/interfaces/book';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { } from '@fortawesome/fontawesome-svg-core'
import { CartServces } from '../../../services/cartServces';
import { Cart } from '../../../services/interfaces/cart';
import { UserService } from '../../../services/userServices';
import { BookResponse } from '../../../services/interfaces/book/bookResponse.interface';

@Component({
  selector: 'app-book-detail-data',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FontAwesomeModule],
  providers: [BookServices, CartServces, UserService],
  templateUrl: './book-detail-data.component.html',
  styleUrls: ['../../home.component.scss', './book-detail-data.component.scss']
})
export class BookDetailDataComponent implements OnInit {

  private route = inject(ActivatedRoute);

  private bookServices = inject(BookServices);

  private cartServices = inject(CartServces);

  public bookList: Book[] = [];

  @Output() successAlertVisible = new EventEmitter<boolean>();

  public book: BookResponse = {
    maSach: 0,
    tenSach: '',
    soLuong: 0,
    ngayXuatBan: '',
    giaTien: 0,
    theLoai: '',
    nhaXuatBan: '',
    image: '',
    tacGia: ''
  };


  constructor() {

  }

  ngOnInit(): void {
    this.getBookData();
  }

  // get book to display on book detail page
  public getBookData() {
    const bookIdParam = this.route.snapshot.paramMap.get('bookId');
  
    if (!bookIdParam) {
      return;
    }
  
    const bookId = parseFloat(bookIdParam);
  
    this.bookServices.getBookById(bookId).subscribe(
      (data) => {
        if (data) {
          this.book = data;
          if (data.image === '') {
            this.book.image = "https://lightwidget.com/wp-content/uploads/localhost-file-not-found-480x480.webp";
          }
          console.log(this.book);
        }
      }
    );
  }
  

  public addBookToCart(bookId: any) {
    const userIdParam = localStorage.getItem('userId')?.toString();
    if (userIdParam) {
      const userId = parseFloat(userIdParam);
      this.cartServices.addBookToCart(bookId, userId).subscribe({
        next: (value) => {
          alert("Thêm vào giỏ hàng thành công");
        },
        error: (err) => {
          alert("Đã xảy ra lỗi khi thêm vào giỏ hàng");
        }
      });
    }

  }
}
