import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit, inject } from "@angular/core";
import { Book } from "./interfaces/book";
import { Observable, catchError, throwError } from "rxjs";
import { ADD_BOOK_URI, BASE__URL, BOOKS_URI, DELETE_BOOK_URI, GET_ALL_BOOK_URI, GET_BOOK_DETAIL_URI, GET_NEW_BOOK_URI, UPDATE_BOOK_URI } from "./api";
import { ListBookResponse } from "./interfaces/book/listBookResponse.interface";
import { BookResponse } from "./interfaces/book/bookResponse.interface";
import { addBookDto } from "./dto/addBookDto";

@Injectable({
    providedIn: 'root'
})
export class BookServices implements OnInit {


    public httpClient = inject(HttpClient);

    constructor() {

    }

    ngOnInit(): void {

    }

    public addNewBook(bookData: addBookDto): Observable<addBookDto | null> {
        return this.httpClient.post<addBookDto>(BASE__URL.concat(ADD_BOOK_URI), bookData).
            pipe(catchError((err) => {
                return throwError(() => err);
            }));
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

    public updateBook(bookId: number, bookData: addBookDto): Observable<addBookDto> {
        const url = `${BASE__URL}${UPDATE_BOOK_URI}?id=${bookId}`;
        console.log("bookdata   ", bookData)
        return this.httpClient.put<addBookDto>(url, bookData);
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

    public deleteBook(id: number): Observable<BookResponse> {
        return this.httpClient.delete<BookResponse>(BASE__URL.concat(DELETE_BOOK_URI + "?id=" + id));
    }
}