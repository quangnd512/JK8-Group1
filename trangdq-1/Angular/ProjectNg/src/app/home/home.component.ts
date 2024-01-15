import { Component } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, take } from 'rxjs';
import { Book, Response, SERVER_URL } from '../shared/defined';

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
