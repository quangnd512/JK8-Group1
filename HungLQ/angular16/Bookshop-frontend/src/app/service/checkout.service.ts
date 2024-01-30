import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { apiHost } from "./Api";
import { book } from "./book.service";

export interface Checkout {
    id: number
    orderDate: string
    deliveryDate: any
    status: string
    total: number
    paymentMethod: string
    checkoutDetails: CheckoutDetail[]
    accept: boolean
  }
  
  export interface CheckoutDetail {
    id: number
    quantity: number
    book: book
  }


@Injectable({
    providedIn: "root"
})
export class CheckoutService{

    constructor(private HttpClient:HttpClient){}

    Checkout():Observable<Checkout>{
        const url = `${apiHost}/check-out`;
        return this.HttpClient.get<Checkout>(url);
    }

    getTotalHistoryOrder():Observable<Checkout[]>{
        const url = `${apiHost}/user/order`;
        return this.HttpClient.get<Checkout[]>(url);
    }

    getHistoryOrder(id){
        const url = `${apiHost}/user/order/${id}`;
        return this.HttpClient.get<Checkout>(url);
    }

    CancelOrder(id):Observable<Checkout[]>{
        const url = `${apiHost}/user/cancel-order/${id}`;
        return this.HttpClient.delete(url).pipe(
            switchMap((data) =>{
                return this.getTotalHistoryOrder();
            })
        )
    }




  }