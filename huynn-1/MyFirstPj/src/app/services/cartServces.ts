import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cart } from "./interfaces/cart";
import { retry } from "rxjs-compat/operator/retry";
import { CART_URI } from "./api";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartServces {

    private httpClient = inject(HttpClient);

    constructor() {

    }

    public createCart(cartData: Cart): Observable<Cart> {
        return this.httpClient.post<Cart>(CART_URI, cartData);
    }


    public getCarts(): Observable<Cart[]> {
        return this.httpClient.get<Cart[]>(CART_URI);
    }

}