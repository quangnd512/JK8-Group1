import {Injectable} from '@angular/core';
import {catchError, map, Observable} from "rxjs";
import {OutputCartItem, headers, Response, SERVER_URL} from "../resources";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private http: HttpClient) {
  }

  public getItems(): Observable<Array<OutputCartItem>> {
    let userId = localStorage.getItem('userId')
    return this.http.get<Response>(`${SERVER_URL}/cart/${userId}`, {headers})
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

  public deleteItem(productId: number): Observable<Response> {
    let userId = localStorage.getItem('userId')
    return this.http.delete<Response>(`${SERVER_URL}/cart/${userId}/${productId}`, {headers})
  }

  public updateItemQuantity(productId: number, quantity: number): Observable<Response> {
    let userId = localStorage.getItem('userId')
    return this.http.put<Response>(`${SERVER_URL}/cart/${userId}/${productId}/${quantity}`, {}, {headers})
  }

  public addToCart(productId: number): Observable<Response> {
    let userId = localStorage.getItem('userId')
    return this.http.post<Response>(`${SERVER_URL}/cart/${userId}`, {productId, quantity: 1}, {headers})
  };

  public deleteAllItems(): Observable<Response> {
    let userId = localStorage.getItem('userId')
    return this.http.delete<Response>(`${SERVER_URL}/cart/${userId}`, {headers})
  }
}
