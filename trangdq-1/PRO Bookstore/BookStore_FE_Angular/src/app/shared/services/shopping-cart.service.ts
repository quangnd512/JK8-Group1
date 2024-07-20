import {Injectable} from '@angular/core';
import {catchError, map, Observable} from "rxjs";
import {getUserId, headers, Item, OutputCartItem, Response, SERVER_URL} from "../resources";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private http: HttpClient) {
  }

  public getCartItems(): Observable<Array<OutputCartItem>> {
    let userId = getUserId()
    return this.http.get<Response>(`${SERVER_URL}/cart/${userId}`, {headers: headers()})
      .pipe(
        map(response => response.data as Array<OutputCartItem>),
        catchError(error => {
          if (error.response.data.errors) {
            throw new Error(error.response.data.errors[0].defaultMessage)
          } else {
            throw new Error(error.response.data.message)
          }
        })
      );
  }

  public updateCart(cartItems: Array<Item>): Observable<Response> {
    let userId = getUserId()
    return this.http.put<Response>(`${SERVER_URL}/cart/${userId}`, cartItems, {headers: headers()})
  }

  // public deleteItem(productId: number): Observable<Response> {
  //   let userId = localStorage.getItem('userId')
  //   return this.http.delete<Response>(`${SERVER_URL}/cart/${userId}/${productId}`, {headers: headers()})
  // }
  //
  // public updateItemQuantity(productId: number, quantity: number): Observable<Response> {
  //   let userId = localStorage.getItem('userId')
  //   return this.http.put<Response>(`${SERVER_URL}/cart/${userId}/${productId}/${quantity}`, {}, {headers: headers()})
  // }

  public addToCart(productId: number): Observable<Response> {
    let userId = getUserId()
    return this.http.post<Response>(`${SERVER_URL}/cart/${userId}`, {productId, quantity: 1}, {headers: headers()})
  };

  public deleteAllItems(): Observable<Response> {
    let userId = getUserId()
    return this.http.delete<Response>(`${SERVER_URL}/cart/${userId}`, {headers: headers()})
  }
}
