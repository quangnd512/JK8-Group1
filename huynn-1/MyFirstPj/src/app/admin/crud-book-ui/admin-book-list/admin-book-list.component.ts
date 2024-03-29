import { Component, OnInit, inject } from '@angular/core';
import { BookServices } from '../../../services/bookServices';
import { Book } from '../../../services/interfaces/book';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { AdminUpdateBookComponent } from '../admin-update-book/admin-update-book.component';
import { ListBookResponse } from '../../../services/interfaces/book/listBookResponse.interface';

@Component({
  selector: 'app-admin-book-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, RouterModule, FontAwesomeModule, AdminUpdateBookComponent],
  providers: [BookServices],
  templateUrl: './admin-book-list.component.html',
  styleUrl: './admin-book-list.component.scss'
})
export class AdminBookListComponent implements OnInit {

  private bookServices = inject(BookServices);

  private router = inject(Router)

  public listOfBooks: ListBookResponse[] = [];

  public faPencil = faPencil;

  constructor() {
  }

  ngOnInit(): void {
    this.bookServices.getAllBooks().subscribe((data) => {
      this.listOfBooks = data
    })
  }

  public navigateToUpdateBook(bookId: number) {
    this.router.navigate(['/admin/update-book', {id: bookId}]);
  }
}
