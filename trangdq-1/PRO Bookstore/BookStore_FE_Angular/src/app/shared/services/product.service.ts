import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {headers, Product, Response, ResponseObject, SERVER_URL} from '../resources';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  public getProducts(page: number = 0, criteria?: string, sort?: boolean, filter?: boolean, value?: string): Observable<ResponseObject> {
    let url = this.accumulateUrl(page, criteria, sort, filter, value)
    return this.http.get<ResponseObject>(url)
  }

  // handle error later
  // in product details: check when async
  public getProductById(id: number): Observable<Product> {
    return this.http.get<Response>(`${SERVER_URL}/product/${id}`)
      .pipe(
        map(response => response.data as Product)
      );
  }

  public addProduct(product: Product): Observable<Response> {
    return this.http.post<Response>(`${SERVER_URL}/admin/product`, product, {headers: headers()})
  }

  public updateProduct(id: number, product: Product): Observable<Response> {
    return this.http.put<Response>(`${SERVER_URL}/admin/product/${id}`, product, {headers: headers()})
  }

  public uploadImages(id: number, images: FormData): Observable<Response> {
    return this.http.put<Response>(`${SERVER_URL}/admin/product/image-upload/${id}`, images, {headers: headers()})
  }

  public deleteProduct(id: number): Observable<Response> {
    return this.http.delete<Response>(`${SERVER_URL}/admin/product/${id}`, {headers: headers()});
  }

  private accumulateUrl(page: number = 0, criteria?: string, sort?: boolean, filter?: boolean, value?: string): string {
    let url = `${SERVER_URL}`;
    if (criteria) {
      if (sort) {
        url += `/${page}?direction=${value}&${criteria}=true`;
      } else if (filter) {
        url += `/product/category/${value}/${page}`
      }
    } else {
      url += `/${page}`
    }
    return url
  }

}
