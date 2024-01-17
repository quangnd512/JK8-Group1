import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cart } from "./interfaces/cart";
import { retry } from "rxjs-compat/operator/retry";
import { CART_URI } from "./api";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartServces {

    private httpClient = inject(HttpClient);

    private cartUpdatedSource = new Subject<void>();

    constructor() {

    }

    cartUpdated$ = this.cartUpdatedSource.asObservable();

    notifyCartUpdated() {
        this.cartUpdatedSource.next();
    }

    public createCart(cartData: Cart): Observable<Cart> {
        return this.httpClient.post<Cart>(CART_URI, cartData);
    }


    public getCarts(): Observable<Cart[]> {
        return this.httpClient.get<Cart[]>(CART_URI);
    }

}