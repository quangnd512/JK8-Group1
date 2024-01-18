import { Component, OnInit, inject } from '@angular/core';
import { Book } from '../../services/interfaces/book';
import { HomeServices } from '../../services/homeServices';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { TruncatePipe } from '../../pipes/TruncatePipe';
import { BookServices } from '../../services/bookServices';
import { ListBookResponse } from '../../services/interfaces/book/listBookResponse.interface';

@Component({
  selector: 'app-list-all-books',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, RouterLink, TruncatePipe],
  providers: [HomeServices,
    BookServices],
  templateUrl: './list-all-books.component.html',
  styleUrl: './list-all-books.component.scss'
})
export class ListAllBooksComponent implements OnInit {

  private router = inject(Router);

  public listAllBooks: ListBookResponse[] = [];

  constructor(private homeServices: HomeServices,
    private bookServices: BookServices) {

  }

  ngOnInit(): void {
    this.bookServices.getAllBooks().subscribe((response) => {
      this.listAllBooks = response;
    })
  }

  public navigateToBookDetail(bookId: any) {
    this.router.navigate(['/home/book-detail', { bookId: bookId }]);
  }

}
