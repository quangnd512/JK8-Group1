import { Injectable } from '@angular/core';
import { Observable, catchError, map, take } from 'rxjs';
import { Product, SERVER_URL } from '../../defined';
import { HttpClient } from '@angular/common/http';


type Response = {
  content: Array<Product> | boolean
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, ) { }

  
  // NG02801: Angular detected that `HttpClient` is not configured to use `fetch` APIs. 
  // It's strongly recommended to enable `fetch` for applications that use Server-Side 
  // Rendering for better performance and compatibility. To enable `fetch`, add the `withFetch()` 
  // to the `provideHttpClient()` call at the root of the application.

  // async getProducts(): Promise<void> {
  //   const response = await fetch(`${SERVER_URL}/${this.page}`, {
  //     method: 'GET'
  //   }).then(response => {
  //     if (!response.ok) throw new Error("HTTP error: " + response.status);
  //     else return response.json();
  //   }).catch(error => {
  //     console.error('Homepage error: ', error);
  //   });
  //   this.products = response.content;
  // }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Response>(`${SERVER_URL}`)
      .pipe(
        take(1),
        map(response => response.content as Array<Product>),
        catchError(error => {
          console.error('Error fetching products:', error);
          return []
        })
      );
  }

  addProduct(): void { 
  }

  updateProduct(): void { 
  }

  deleteProduct(): void { 
  }


}
