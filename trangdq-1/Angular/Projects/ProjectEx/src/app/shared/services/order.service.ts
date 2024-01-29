import {Injectable} from '@angular/core';
import {headers, OrderDTO, Response, SERVER_URL} from "../resources";
import {Observable} from "rxjs";
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
}
