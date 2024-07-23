import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {getUserId, headers, Response, ResponseObject, SERVER_URL, Voucher, VoucherDTO} from "../resources";

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  constructor(private http: HttpClient) {
  }

  public addVoucher(voucher: VoucherDTO): Observable<any> {
    return this.http.post<any>(`${SERVER_URL}/admin/voucher`, voucher, {headers: headers()});
  }

  public getVouchersByUserId(): Observable<Array<Voucher>> {
    return this.http.get<Response>(`${SERVER_URL}/vouchers/${getUserId()}`, {headers: headers()})
      .pipe(
        map(response => response.data as Array<Voucher>)
      );
  }

  public getVouchers(page: number = 0): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(`${SERVER_URL}/admin/voucher/${page}`, {headers: headers()})
  }

  public deleteVoucher(id: number): Observable<Response> {
    return this.http.delete<Response>(`${SERVER_URL}/voucher/${id}`, {headers: headers()});
  }


}
