import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartServces } from '../../services/cartServces';
import { Book } from '../../services/interfaces/book';
import { BookServices } from '../../services/bookServices';
import { TruncatePipe } from '../../pipes/TruncatePipe';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [RouterLink, CommonModule, TruncatePipe],
  providers: [CartServces, BookServices],
  templateUrl: './home-header.component.html',
  // styleUrl: './home-header.component.scss'
  styleUrl: '../home.component.scss'

})
export class HomeHeaderComponent implements OnInit  {

  private cartServices = inject(CartServces);

  private bookServices = inject(BookServices);

  public bookList: Book[] = [];

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
    } else {
      element?.classList.add('is-visible');
    }
  }

  //calculate total price of book inside the cart
  calculateTotalAmount() {
    this.totalAmount = this.bookList.reduce((total, book) => total + book.price, 0);
  }

  //binding data to cart view
  public displayCartContent() {
    const userId = localStorage.getItem('userId')?.toString();
    if (userId) {
      this.cartServices.getCarts().subscribe({
        next: (carts) => {
          // Filter carts based on userId
          const userCarts = carts.filter(cart => cart.userId === userId);

          userCarts.forEach(cart => {
            // Assuming there is a bookId property in your Cart model
            const bookId = cart.bookId;

            // Fetch book details using bookId
            this.bookServices.getBook(bookId).subscribe({
              next: (book) => {
                if (book.image === '') {
                  book.image = "https://lightwidget.com/wp-content/uploads/localhost-file-not-found-480x480.webp";
                }
                // Push the book into bookList
                this.bookList.push(book);
              },
              error: (bookError) => {
                console.error('Error retrieving book:', bookError);
              },
              complete: () => {
                // Calculate total amount after fetching all books
                this.calculateTotalAmount();
              }
            });
          });
        },
        error: (error) => {
          console.error('Error retrieving carts:', error);
        }
      });
    }
  }
}
