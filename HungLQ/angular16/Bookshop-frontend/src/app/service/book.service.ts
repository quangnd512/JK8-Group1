import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { apiHost } from "./Api";
import { Category } from "./category.service";

export interface book{
    id: number,
    title: string,
    author: string,
    category: Category,
    releaseDate: Date,
    price: BigInteger,
    imgCover: string,
}

//  Pageable

export interface Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
}
export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface ListPageable {
    content: book[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

@Injectable({
    providedIn: "root"
})
export class BookService{

    constructor(private HttpClient: HttpClient){}

    getAllBooks(): Observable<book[]>{
        return this.HttpClient.get<book[]>(apiHost+"/books/");
    }

    getAllBooksPageable(params?:string):Observable<ListPageable>{
        let url = apiHost + "/books/pageable";
        if(params !== undefined) url += params;
        return this.HttpClient.get<ListPageable>(url);
    }

    getByCategory(categoryId:string,params?:string): Observable<book[]>{
        let url = apiHost + "/books/category/" + categoryId;
        if(params !== undefined) url += params;
        return this.HttpClient.get<book[]>(url);
    }

}
