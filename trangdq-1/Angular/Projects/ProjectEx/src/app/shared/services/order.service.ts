import {Injectable} from '@angular/core';
import {headers, OrderDTO, OutputOrder, Response, ResponseObject, SERVER_URL} from "../resources";
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
    let userId = localStorage.getItem('userId')
    return this.http.post<Response>(`${SERVER_URL}/order/${userId}`, data, {headers: headers()})
  }

  public getUserOrdersByStatus(status: string, page: number = 0): Observable<Array<OutputOrder>> {
    let userId = localStorage.getItem('userId')
    return this.http.get<ResponseObject>(`${SERVER_URL}/order/${page}/${userId}?status=${status}`).pipe(
      map((response) => response.data.content as Array<OutputOrder>),
      catchError((error) => {
        console.error(error)
        return of([])
      })
    )
  }

  public getUserOrdersByStatusTotalPages(status: string): Observable<number> {
    let userId = localStorage.getItem('userId')
    return this.http.get<ResponseObject>(`${SERVER_URL}/order/0/${userId}?status=${status}`).pipe(
      map((response) => response.data.totalPages as number),
      catchError((error) => {
        console.error(error)
        return of(0)
      })
    )
  }

  public getOrdersByStatus(status: string, page: number = 0): Observable<Array<OutputOrder>> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/order/${page}?status=${status}`).pipe(
      map((response) => response.data.content as Array<OutputOrder>),
      catchError((error) => {
        console.error(error)
        return of([])
      })
    )
  }

  public getTotalOrdersByStatus(status: string): Observable<number> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/order/0?status=${status}`).pipe(
      map((response) => response.data.totalElements as number),
      catchError((error) => {
        console.error(error)
        return of(0)
      })
    )
  }

  public getOrdersByStatusTotalPages(status: string): Observable<number> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/order/0?status=${status}`).pipe(
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
