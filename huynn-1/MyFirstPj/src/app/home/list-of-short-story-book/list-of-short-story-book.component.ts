import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ListBookResponse} from "../../services/interfaces/book/listBookResponse.interface";
import {BookServices} from "../../services/bookServices";
import {BookType} from "../../services/constants/book-type";
import {CommonModule, CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {TruncatePipe} from "../../pipes/TruncatePipe";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-list-of-short-story-book',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    NgIf,
    TruncatePipe,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    BookServices
  ],
  templateUrl: './list-of-short-story-book.component.html',
  styleUrl: './list-of-short-story-book.component.scss'
})
export class ListOfShortStoryBookComponent implements OnInit {

  private router = inject(Router);

  public listOfBooks: ListBookResponse[] = [];

  constructor(
    private bookServices: BookServices) {

  }

  ngOnInit(): void {
    this.bookServices.getBookByType(BookType.TRUYEN_NGAN).subscribe((response) => {
      this.listOfBooks = response;
    })
  }

  public navigateToBookDetail(bookId: any) {
    this.router.navigate(['/home/book-detail', {bookId: bookId}]);
  }

}
