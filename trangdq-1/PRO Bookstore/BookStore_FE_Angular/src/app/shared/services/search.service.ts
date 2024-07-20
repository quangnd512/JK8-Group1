import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ResponseObject, SERVER_URL} from "../resources";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchKeywordSource = new BehaviorSubject<string>('');
  public searchKeyword$ = this.searchKeywordSource.asObservable();

  constructor(private http: HttpClient) {
  }

  public searchProducts(page: number = 0, keywords: string): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/search/${page}?name=${keywords}`);
  }

  public setSearchKeyword(keyword: string) {
    this.searchKeywordSource.next(keyword);
  }
}
