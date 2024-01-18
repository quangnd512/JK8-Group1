import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {headers, Product, ProductDTO, SERVER_URL} from '../../defined';
import {HttpClient} from '@angular/common/http';

type ResponseObject = {
  data: {
    content?: Array<Product> | Product,
    totalElements?: number,
    first?: boolean,
    last?: boolean,
    pageable?: {
      pageNumber?: number,
      pageSize?: number
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  public getProducts(page: number = 0, sort?: string, direction = 'asc'): Observable<Array<Product>> {
    let url = this.accumulateUrl(page,sort,direction)

    return this.http.get<ResponseObject>(url)
      .pipe(
        map(response => response.data.content as Array<Product>),
        catchError(error => {
          console.error('Error fetching products:', error);
          return of([]);
        })
      );
  }

  public getTotalProducts(sort?: string, direction = 'asc'): Observable<number> {
    let url = this.accumulateUrl(0,sort,direction)
    return this.http.get<ResponseObject>(url)
      .pipe(
        map(response => response.data.totalElements as number),
        catchError(error => {
          console.error('Error fetching products:', error);
          return of(0);
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

  public addProduct(product: ProductDTO): Observable<void> {
    return this.http.post<void>(`${SERVER_URL}/admin/product`, product, { headers })
  }

  public updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${SERVER_URL}/admin/product/${product.id}`, product, { headers })
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${SERVER_URL}/admin/product/${id}`, { headers })
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/product/${id}`)
      .pipe(
        map(response => response.data as Product),
        catchError(error => {
          console.error('Error fetching products:', error);
          return of()
        })
      );
  }
}
