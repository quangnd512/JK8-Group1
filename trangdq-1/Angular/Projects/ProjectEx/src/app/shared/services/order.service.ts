import {Injectable} from '@angular/core';
import {headers, Order, OrderDTO, OrderStatus, Response, SERVER_URL} from "../resources";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {
  }

  public checkout(data: OrderDTO): Observable<Response> {
    let userId = localStorage.getItem('userId')
    return this.http.post<Response>(`${SERVER_URL}/order/${userId}`, data, {headers})
  }

  public getOrderByStatus(status: OrderStatus): Observable<Array<Order>> {
    return this.http.get<Response>(`${SERVER_URL}order?status=${status}`).pipe(
      map((response) => response.data as Array<Order>)
    )
  }

  public updateStatus(id: number, fromStatus: OrderStatus, toStatus: OrderStatus): Observable<Response> {
    return this.http.put<Response>(`${SERVER_URL}/order/${id}`, {fromStatus, toStatus}, {headers});
  }
}
