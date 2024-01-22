import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookService, ListPageable, book } from 'src/app/service/book.service';
import { Category, CategoryService } from 'src/app/service/category.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [],
})
export class HomeComponent implements OnInit {
  loadedAll:boolean = false;
  books: book[] = [];
  Pages: number[];
  totalPage: number;
  currentPage: number;

  constructor (
    private bookService:BookService,
    private activedRoute: ActivatedRoute,
    private router: Router){
  }

  ngOnInit(): void {
      //get all book
      // this.bookService.getAllBooks().subscribe(
      //   (data) => this.books = data
      // )
    
      //

      if(!this.loadedAll){
        this.bookService.getAllBooksPageable().subscribe(
          (data:ListPageable) => {
            console.log("getAll");
            this.books = data.content;
            this.totalPage = data.totalPages;
            this.Pages = Array(this.totalPage).fill(0).map((n,i) => i+1);
            this.currentPage = data.pageable.pageNumber;
          }
        )
        this.loadedAll = true;
      }

      this.activedRoute.params.subscribe(
        (param: Params) => {
          const id:string = param['id'];
          if(id !== undefined){
            console.log("getByCategory")
            this.bookService.getByCategory(id).subscribe(
              (data) => this.books = data
            )
          }
        }
      )
  };
  
  
}
