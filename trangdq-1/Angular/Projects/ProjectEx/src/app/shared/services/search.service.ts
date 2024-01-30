import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {Product, ResponseObject, SERVER_URL} from "../resources";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchKeywordSource = new BehaviorSubject<string>('');
  searchKeyword$ = this.searchKeywordSource.asObservable();

  constructor(private http: HttpClient) {
  }

  public searchProducts(page: number = 0, keywords: string): Observable<Array<Product>> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/search/${page}?name=${keywords}`)
      .pipe(
        map(response => response.data.content as Array<Product>),
        catchError(error => {
          console.error(error);
          return of([]);
        })
      );
  }

  public setSearchKeyword(keyword: string) {
    this.searchKeywordSource.next(keyword);
  }
}
