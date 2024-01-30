import { Injectable, inject } from "@angular/core";
import { Book } from "./interfaces/book";
import { BOOKS_URI, GET_NEW_BOOK_URI } from "./api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ListBookResponse } from "./interfaces/book/listBookResponse.interface";

@Injectable({
    providedIn: 'root'
})
export class HomeServices {

    private httpClient = inject(HttpClient);

    constructor() {

    }

    // decripted
    public getBooks(): Observable<Book[]> {
        return this.httpClient.get<Book[]>(BOOKS_URI);
    }
}