import { Component } from '@angular/core';
import { Book, SERVER_URL } from '../shared/defined';
// import { HttpClient } from '@angular/common/http';
// import { Observable, catchError, map, of, take } from 'rxjs';

export type Response = {
  content: Array<Book>
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public books: Array<Book> = []
  // public books$: Observable<Array<Book>> = this.getProducts()
  
  constructor() { } //private http: HttpClient

  ngOnInit(): void {
    this.getProducts()
    // this.books$.subscribe(books => {
    //   this.books = books 
    // });
  }

  async getProducts(): Promise<void> {
    const response = await fetch(`${SERVER_URL}/0`, {
      method: 'GET'
    }).then(response => {
      if (!response.ok) throw new Error("HTTP error: " + response.status);
      else return response.json();
    }).catch(error => {
      console.error('Homepage error: ', error);
    });
    this.books = response.content;
  }

  // getProducts(): Observable<Array<Book>> {
  //   return this.http.get<Response>(`${SERVER_URL}`)
  //     .pipe(
  //       take(1),
  //       map(response => response.content as Array<Book>),
  //       catchError(error => {
  //         console.error('Error fetching books:', error);
  //         return []
  //       })
  //     );
}