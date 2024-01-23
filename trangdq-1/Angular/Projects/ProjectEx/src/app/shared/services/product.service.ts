import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {headers, Product, ProductDTO, ResponseObject, SERVER_URL} from '../resources';
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

  public getTotalProducts(sort?: string, direction = 'asc'): Observable<number> {
    let url = this.accumulateUrl(0, sort, direction)
    return this.http.get<ResponseObject>(url)
      .pipe(
        map(response => response.data.totalElements as number),
        catchError(error => {
          console.error(error);
          return of(0);
        })
      );
  }

  public addProduct(product: ProductDTO): Observable<Response> {
    return this.http.post<Response>(`${SERVER_URL}/admin/product`, product, {headers})
  }

  public updateProduct(product: Product): Observable<Response> {
    return this.http.put<Response>(`${SERVER_URL}/admin/product/${product.id}`, product, {headers})
  }

  public deleteProduct(id: number): Observable<Response> {
    return this.http.delete<Response>(`${SERVER_URL}/admin/product/${id}`, {headers});
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/product/${id}`)
      .pipe(
        map(response => response.data as Product),
        catchError(error => {
          console.error(error);
          return of()
        })
      );
  }

  private accumulateUrl(page: number = 0, sort?: string, direction = 'asc'): string {
    let url = `${SERVER_URL}/${page}`;
    if (sort) {
      url += `?direction=${direction}`;
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
