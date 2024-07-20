import {Injectable} from '@angular/core';
import {getUserId, headers, OrderDTO, Response, ResponseObject, SERVER_URL} from "../resources";
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {
  }

  // handle error later
  public checkout(data: OrderDTO): Observable<Response> {
    let userId: string = getUserId()
    return this.http.post<Response>(`${SERVER_URL}/order/${userId}`, data, {headers: headers()})
  }

  public payByPaypal(total: number) {
    return this.http.post<Response>(`${SERVER_URL}/order/paypal/transfer/${total}`, {headers: headers()})
  }

  public getUserOrdersByStatus(status: string, page: number = 0): Observable<ResponseObject> {
    let userId = getUserId()
    return this.http.get<ResponseObject>(`${SERVER_URL}/order/${page}/${userId}?status=${status}`)
  }

  public getUserOrdersByStatusTotalPages(status: string): Observable<number> {
    let userId = getUserId()
    return this.http.get<ResponseObject>(`${SERVER_URL}/order/0/${userId}?status=${status}`).pipe(
      map((response) => response.data.totalPages as number),
      catchError((error) => {
        console.error(error)
        return of(0)
      })
    )
  }

  public getOrdersByStatus(status: string, page: number = 0): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/admin/order/${page}?status=${status}`, {headers: headers()})
  }

  public getTotalOrdersByStatus(status: string): Observable<number> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/admin/order/0?status=${status}`, {headers: headers()}).pipe(
      map((response) => response.data.totalElements as number),
      catchError((error) => {
        console.error(error)
        return of(0)
      })
    )
  }

  public getOrdersByStatusTotalPages(status: string): Observable<number> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/admin/order/0?status=${status}`, {headers: headers()}).pipe(
      map((response) => response.data.totalPages as number),
      catchError((error) => {
        console.error(error)
        return of(0)
      })
    )
  }

  // handle error later
  public updateStatus(id: number, fromStatus: string, toStatus: string): Observable<Response> {
    return this.http.put<Response>(`${SERVER_URL}/order/${id}`, {fromStatus, toStatus}, {headers: headers()});
  }
}
