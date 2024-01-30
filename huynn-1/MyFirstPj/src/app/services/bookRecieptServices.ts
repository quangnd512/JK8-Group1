import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit, inject } from "@angular/core";
import { Observable } from "rxjs";
import { BASE__URL, CREATE_BOOK_RETURN_RECIPT_URI, GET_BORROW_BOOK_BY_ID_URL, GET_BORROW_BOOK_RECIEPT_URI, GET_RETURN_BOOK_RECIEPT_URI } from "./api";
import { GetBorrowBookReciptsDto } from "./dto/getBookBorrowReciptsDto";
import { GetReturnBookReciptsDto } from "./dto/getReturnBookRecieptsDto";

@Injectable({
    providedIn: 'root'
})
export class BookRecieptServices implements OnInit {


    public httpClient = inject(HttpClient);

    constructor() {

    }

    ngOnInit(): void {

    }

    public getBookBorrowRecipts(): Observable<GetBorrowBookReciptsDto[]> {
        return this.httpClient.get<GetBorrowBookReciptsDto[]>(BASE__URL.concat(GET_BORROW_BOOK_RECIEPT_URI));
    }

    public getBookBorrowRecipt(id: any): Observable<GetBorrowBookReciptsDto> {
        return this.httpClient.get<GetBorrowBookReciptsDto>(BASE__URL.concat(GET_BORROW_BOOK_BY_ID_URL + "?id=" + id));
    }

    public getBookReturnRecipts(): Observable<GetReturnBookReciptsDto[]> {
        return this.httpClient.get<GetReturnBookReciptsDto[]>(BASE__URL.concat(GET_RETURN_BOOK_RECIEPT_URI));
    }

    public getBookReturnRecipt(id: any): Observable<GetReturnBookReciptsDto> {
        return this.httpClient.get<GetReturnBookReciptsDto>(BASE__URL.concat(GET_RETURN_BOOK_RECIEPT_URI + "?id=" + id));
    }

    public createBookReturnRecipt(data: any): Observable<any> {
        return this.httpClient.post<any>(BASE__URL.concat(CREATE_BOOK_RETURN_RECIPT_URI), data);
    }
}