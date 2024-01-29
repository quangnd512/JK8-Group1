import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE__URL, GET_ALL_CHECKOUTS_URI} from "./api";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient) { }

  public getALlCheckouts(id: any): Observable<any> {
    return  this.httpClient.get(BASE__URL.concat(GET_ALL_CHECKOUTS_URI + "?maTk=" + id));
  }
}
