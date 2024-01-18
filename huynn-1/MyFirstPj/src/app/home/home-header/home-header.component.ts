import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartServces } from '../../services/cartServces';
import { BookServices } from '../../services/bookServices';
import { TruncatePipe } from '../../pipes/TruncatePipe';
import { ListBookResponse } from '../../services/interfaces/book/listBookResponse.interface';
import { BookResponse } from '../../services/interfaces/book/bookResponse.interface';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [RouterLink, CommonModule, TruncatePipe],
  providers: [CartServces, BookServices],
  templateUrl: './home-header.component.html',
  // styleUrl: './home-header.component.scss'
  styleUrl: '../home.component.scss'

})
export class HomeHeaderComponent implements OnInit {

  private cartServices = inject(CartServces);

  private bookServices = inject(BookServices);

  public bookList: BookResponse[] = [];

  public totalAmount = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.displayCartContent();
  }

  //click to display cart
  public displayCart() {
    var element = document.querySelector('.block-minicart');

    var isVisible = element?.classList.contains('is-visible');

    if (isVisible) {
      element?.classList.remove('is-visible');
      this.removeCartContent();
    } else {
      element?.classList.add('is-visible');
      this.displayCartContent();
    }
  }

  //calculate total price of book inside the cart
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
  

  //binding data to cart view
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

  public removeCartContent() {
    this.bookList = [];
  }
  
}
