import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HomeHeaderComponent } from '../home/home-header/home-header.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { CartServces } from '../services/cartServces';
import { BookResponse } from '../services/interfaces/book/bookResponse.interface';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, HomeHeaderComponent, HttpClientModule, FontAwesomeModule, HttpClientModule],
  providers: [CartServces],
  templateUrl: './shopping-cart.component.html',
  // styleUrl: './shopping-cart.component.scss'
  styleUrls: ['./shopping-cart.component.scss', '../home/home.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public faXmark = faXmark;

  private cartServices = inject(CartServces);

  public bookList: BookResponse[] = [];

  public totalAmount: number = 0;

  constructor() {

  }

  ngOnInit(): void {
    this.displayCartContent();
  }

  public displayCartContent() {
    const userIdParam = localStorage.getItem('userId');

    if (!userIdParam) {
      return;
    }

    const userId = parseFloat(userIdParam);

    this.cartServices.getCart(userId).subscribe({
      next: (cart) => {
        this.bookList = [...cart.sachList];
      },
      error: (error) => {
        console.error('Error retrieving carts:', error);
      },
      complete: () => {
        this.calculateTotalAmount();
      }
    });
  }

  // calculate total amount of money in cart
  calculateTotalAmount() {
    if (this.bookList && Array.isArray(this.bookList)) {
      this.totalAmount = this.bookList.reduce((total, book) => {
        const bookPrice = parseFloat(book.giaTien.toString());
        return isNaN(bookPrice) ? total : total + bookPrice;
      }, 0);
    } else {
      console.error("Invalid or missing bookList");
      this.totalAmount = 0;
    }
  }

  // hadle remove book from cart
  public removeBookFromCart(bookId: number) {
    let accId: any = localStorage.getItem('userId');
    if (accId) {
      accId = parseFloat(accId);
      this.cartServices.removeBookFromCart(bookId, accId).subscribe(data => {
        this.displayCartContent();
      });
    }
  }

  public removeBook() {
    this.bookList = [];
  }

  // handle checkout
  public checkout() {
    if (this.bookList.length == 0) {
      alert("Vui lòng thêm sách vào giỏ hàng");
      return;
    }
    let accId: any = localStorage.getItem("userId");
    accId = parseFloat(accId);
    this.cartServices.checkout(accId).subscribe({
      next: value => {
        if (value) {
          alert("Đã gửi yêu cầu thành công");
          this.removeBook();
          this.displayCartContent()
          this.totalAmount = 0;
          return;
        }
        alert("Yêu cầu mượn thất bại");
        return;
      },
      error: err => {
        alert("Yêu cầu mượn thất bại");
        console.log(err);
        return;
      }
    }) 
  }

}
