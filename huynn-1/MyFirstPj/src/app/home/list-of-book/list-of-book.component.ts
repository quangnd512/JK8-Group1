import { Component, Injectable, OnInit, inject } from '@angular/core';
import { HomeServices } from '../../services/homeServices';
import { Book } from '../../services/interfaces/book';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TruncatePipe } from '../../pipes/TruncatePipe';
import { ListBookResponse } from '../../services/interfaces/book/listBookResponse.interface';
import { BookServices } from '../../services/bookServices';

@Component({
  selector: 'app-list-of-book',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, RouterLink, TruncatePipe],
  providers: [HomeServices,
    BookServices],// need to add this to use httpclient
  templateUrl: './list-of-book.component.html',
  styleUrls: ['./list-of-book.component.scss', './style/style.scss']
})
export class ListOfBookComponent implements OnInit {

  private router = inject(Router)

  public listOfNewBooks: ListBookResponse[] = [];

  constructor(private bookServices: BookServices) {

  }

  ngOnInit(): void {
    this.bookServices.getNewBooks().subscribe((response) => {
      this.listOfNewBooks = response;
    })
  }

  public navigateToBookDetail(bookId: any) {
    this.router.navigate(['/home/book-detail', { bookId: bookId }]);
  }
}
