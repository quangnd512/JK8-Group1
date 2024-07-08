import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {headers, Product, Response, ResponseObject, SERVER_URL} from '../resources';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  public getProducts(page: number = 0, sort?: string, direction = 'asc'): Observable<Array<Product>> {
    let url = this.accumulateUrl(page, sort, direction)
    return this.http.get<ResponseObject>(url)
      .pipe(
        map(response => response.data.content as Array<Product>),
        catchError(error => {
          console.error(error);
          return of([]);
        })
      );
  }

  // handle error later
  // in product details: check when async
  public getProductById(id: number): Observable<Product> {
    return this.http.get<Response>(`${SERVER_URL}/product/${id}`)
      .pipe(
        map(response => response.data as Product)
      );
  }

  public getTotalProducts(direction = 'asc'): Observable<number> {
    let url = this.accumulateUrl(0, direction)
    return this.http.get<ResponseObject>(url)
      .pipe(
        map(response => response.data.totalElements as number),
        catchError(error => {
          console.error(error);
          return of(0);
        })
      );
  }

  public getTotalSearchedPages(keywords: string): Observable<number> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/search/0?name=${keywords}`)
      .pipe(
        map(response => response.data.totalPages as number),
        catchError(error => {
          console.error(error);
          return of(0);
        })
      )
  }

  public getTotalPages(sort?: string, direction = 'asc'): Observable<number> {
    let url = this.accumulateUrl(0, sort, direction)
    return this.http.get<ResponseObject>(url)
      .pipe(
        map(response => response.data.totalPages as number),
        catchError(error => {
          console.error(error);
          return of(0);
        })
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

  private accumulateUrl(page: number = 0, sort?: string, direction?: string): string {
    let url = `${SERVER_URL}/${page}`;
    if (direction) {
      url += `?direction=${direction}`;
    }
    if (sort) {
      if (sort === 'price') {
        url += '&price=true';
      } else if (sort === 'name') {
        url += '&name=true';
      } else if (sort === 'category') {
        url += '&category=true';
      } else if (sort === 'inStock') {
        url += '&inStock=true';
      }
    }
    return url
  }
}
