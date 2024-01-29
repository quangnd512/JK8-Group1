import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ListBookResponse} from "../../services/interfaces/book/listBookResponse.interface";
import {BookServices} from "../../services/bookServices";
import {BookType} from "../../services/constants/book-type";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {TruncatePipe} from "../../pipes/TruncatePipe";

@Component({
  selector: 'app-list-of-poem-book',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TruncatePipe
  ],
  providers: [
    BookServices
  ],
  templateUrl: './list-of-poem-book.component.html',
  styleUrls: [
    '../../home/home.component.scss'
  ]
})
export class ListOfPoemBookComponent implements OnInit{

  private router = inject(Router);

  public listOfBooks: ListBookResponse[] = [];

  constructor(
    private bookServices: BookServices) {

  }

  ngOnInit(): void {
    this.bookServices.getBookByType(BookType.THO).subscribe((response) => {
      this.listOfBooks = response;
    })
  }

  public navigateToBookDetail(bookId: any) {
    this.router.navigate(['/home/book-detail', {bookId: bookId}]);
  }
}
