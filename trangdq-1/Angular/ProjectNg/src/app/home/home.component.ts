import { Component } from '@angular/core';
import { SERVER_URL } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, take } from 'rxjs';
import { log } from 'console';

type Book = {
  id: number,
  name: string,
  price: number,
  description: string,
  inStock: number,
  images: Array<string>
  category: string,
  discount: number
}

type Response = {
  content: Array<Book>
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public books$: Observable<Array<Book>> = this.getProducts()
  public books: Array<Book> = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.books$.subscribe(books => {
      this.books = books 

    });
  }

  getProducts(): Observable<Array<Book>> {
    return this.http.get<Response>(`${SERVER_URL}`)
      .pipe(
        take(1),
        map(response => response.content as Array<Book>),
        catchError(error => {
          console.error('Error fetching books:', error);
          return []
        })
      );
  }

}
