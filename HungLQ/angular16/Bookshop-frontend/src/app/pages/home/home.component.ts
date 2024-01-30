import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookService, ListPageable, book } from 'src/app/service/book.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [],
})
export class HomeComponent implements OnInit {
  books: book[] = [];
  Pages: number[];
  currentPage: number;
  route: string;

  constructor (
    private bookService:BookService,
    private activedRoute: ActivatedRoute,
    private router: Router){
  }

  ngOnInit(): void {
      const route_param = +this.activedRoute.snapshot.params['id'];
      if(!route_param){
        this.bookService.getAllBooksPageable().subscribe(
          (data:ListPageable) => {
            console.log("getAll");
            this.books = data.content;
            this.Pages = Array(data.totalPages).fill(0).map((n,i) => i+1);
            this.currentPage = data.pageable.pageNumber + 1;
          }
        )
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
        },
        (err) => console.log(err),
        () =>  console.log("1")
      )

      this.activedRoute.queryParams.subscribe(
        (queryParam) => {
          const type_sort = queryParam['type_sort'];
          const page = queryParam['page'];
          const search = queryParam['search']
        }
        
      )

      this.route = this.router.url;
  };
  
  
}
