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

  private userServces = inject(UserService);

  private cartServices = inject(CartServces);

  public bookList: Book[] = [];

  @Output() successAlertVisible = new EventEmitter<boolean>();

  public book: Book = {
    id: '',
    name: '',
    image: '',
    price: 0,
    detail: '',
    author: '',
    quantity: 0,
    publishedDate: '',
    bookType: '',
    publisher: ''
  };

  constructor() {
    this.getBookData();
  }

  ngOnInit(): void {
      
  }

  public getBookData() {
    const bookId: string | null = this.route.snapshot.paramMap.get('bookId');
    if (bookId) {
      this.bookServices.getBook(bookId).subscribe(
        (data) => {
          if (data.image == '') {
            data.image = "https://lightwidget.com/wp-content/uploads/localhost-file-not-found-480x480.webp";
            this.book = data;
            return;
          }
          return;
        }
      )
    }
  }

  public addBookToCart(bookId: string) {
    const userId = localStorage.getItem('userId')?.toString();
    if (userId) {
      const cartData: Cart = {
        id: '',
        bookId: bookId,
        userId: userId
      }
      this.cartServices.createCart(cartData).subscribe({
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
