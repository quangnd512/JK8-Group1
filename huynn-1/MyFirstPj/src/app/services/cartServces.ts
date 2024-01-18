import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cart } from "./interfaces/cart";
import { retry } from "rxjs-compat/operator/retry";
import { ADD_BOOK_TO_CART_URI, BASE__URL, CART_URI, GET_CART_URI } from "./api";
import { Observable, Subject } from "rxjs";
import { CartResponse } from "./interfaces/book/cartResponse.interface";
import { getCartResponse } from "./interfaces/cart/getCartResponse.interface";

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

    public createCart(cartData: Cart): Observable<Cart> {
        return this.httpClient.post<Cart>(CART_URI, cartData);
    }


    public getCarts(): Observable<Cart[]> {
        return this.httpClient.get<Cart[]>(CART_URI);
    }

}