import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cart } from "./interfaces/cart";
import { retry } from "rxjs-compat/operator/retry";
import { ADD_BOOK_TO_CART_URI, BASE__URL, CART_URI, CHECK_OUT_URL, GET_CART_URI, REMOVE_BOOK_FROM_CART_URI } from "./api";
import { Observable, Subject, catchError, throwIfEmpty } from "rxjs";
import { CartResponse } from "./interfaces/book/cartResponse.interface";
import { getCartResponse } from "./interfaces/cart/getCartResponse.interface";
import { error } from "console";

@Injectable({
    providedIn: 'root'
})
export class CartServces {

    private httpClient = inject(HttpClient);

    constructor() {

    }

    public addBookToCart(bookId: number, userId: number): Observable<CartResponse> {
        let url = `${BASE__URL}${ADD_BOOK_TO_CART_URI}?maSach=${bookId}&maTk=${userId}`
        return this.httpClient.post<CartResponse>(url, null);
    }

    public getCart(userId: number): Observable<getCartResponse> {
        let url = `${BASE__URL}${GET_CART_URI}?maTk=${userId}`
        return this.httpClient.get<getCartResponse>(url);
    }

    public removeBookFromCart(bookId: number, accId: number): Observable<null> {
        return this.httpClient.delete<null>(BASE__URL.concat(REMOVE_BOOK_FROM_CART_URI + "?maSach=" + bookId + "&maTk=" + accId)).
            pipe(
                catchError(err => { throw err })
            );
    }

    public checkout(accId: number): Observable<any> {
        return this.httpClient.post<any>(BASE__URL.concat(CHECK_OUT_URL + "?maTk=" + accId), null).pipe(
            catchError(
                error => {
                    throw error;
                }
            )
        )
    }

    // decripted
    public createCart(cartData: Cart): Observable<Cart> {
        return this.httpClient.post<Cart>(CART_URI, cartData);
    }


    public getCarts(): Observable<Cart[]> {
        return this.httpClient.get<Cart[]>(CART_URI);
    }
    //decripted

}