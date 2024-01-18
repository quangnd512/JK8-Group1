import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit, inject } from "@angular/core";
import { Book } from "./interfaces/book";
import { Observable } from "rxjs";
import { BASE__URL, BOOKS_URI, GET_ALL_BOOK_URI, GET_BOOK_DETAIL_URI, GET_NEW_BOOK_URI } from "./api";
import { ListBookResponse } from "./interfaces/book/listBookResponse.interface";
import { BookResponse } from "./interfaces/book/bookResponse.interface";

@Injectable({
    providedIn: 'root'
})
export class BookServices implements OnInit {


    public httpClient = inject(HttpClient);

    constructor() {

    }

    ngOnInit(): void {

    }

    public addBook(bookData: Book): Observable<Book> {
        return this.httpClient.post<Book>(BOOKS_URI, bookData)
    }

    public getNewBooks(): Observable<ListBookResponse[]> {
        return this.httpClient.get<ListBookResponse[]>(BASE__URL.concat(GET_NEW_BOOK_URI));
    }

    public getAllBooks(): Observable<ListBookResponse[]> {
        return this.httpClient.get<ListBookResponse[]>(BASE__URL.concat(GET_ALL_BOOK_URI));
    }

    public getBookById(bookId: number): Observable<BookResponse | null> {
        const url = `${BASE__URL}${GET_BOOK_DETAIL_URI}?id=${bookId}`;
        return this.httpClient.get<BookResponse>(url);
    }

    // decripted
    public getBooks(): Observable<Book[]> {
        return this.httpClient.get<Book[]>(BOOKS_URI);
    }
    // decripted


    // decripted
    public getBook(id: string): Observable<Book> {
        return this.httpClient.get<Book>(BOOKS_URI.concat("/" + id));
    }
    // decripted


    // decripted
    public updateBook(id: string, data: Book): Observable<Book> {
        return this.httpClient.put<Book>(BOOKS_URI.concat("/" + id), data);
    }
    // decripted

    public deleteBook(id: string): Observable<Book> {
        return this.httpClient.delete<Book>(BOOKS_URI.concat("/" + id));
    }
}