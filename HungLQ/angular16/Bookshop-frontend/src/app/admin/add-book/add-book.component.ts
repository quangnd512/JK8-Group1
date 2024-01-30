import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/service/category.service';
import { BookService, book } from '../../service/book.service';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  @ViewChild('bookForm') bookForm:NgForm ;
  message:string;
  book:book = {
    id: -1,
    title: "",
    author: "",
    category: null,
    releaseDate: null,
    price: null,
    imgCover: null,
  };
  categories:Category[];

  constructor(private CategoryService:CategoryService, private BookService:BookService){}

  ngOnInit(): void {
      this.CategoryService.getCategories().subscribe(
        (data) => this.categories = data
      )
  }

  addBook(){
    const value = this.bookForm.value;
    const fileInput = document.getElementById('cover') as HTMLInputElement;
    const selectedFile = fileInput.files?.[0];
    const formData = new FormData();
    formData.append('imgcover', selectedFile);
    formData.append('title', value.title);
    formData.append('author', value.author);
    formData.append('price', value.price);
    formData.append('category.id', value.category);
    formData.append('releaseDate',value.releaseDate);
    console.log(value);
    this.BookService.addBook(formData).subscribe(
      (data) => {
        this.message = "Thêm Sách Thành Công"
        console.log(data);
      }
    )
    

  }


  preview(event: any) {
    const frame = document.getElementById('frame') as HTMLImageElement;
    frame.src = URL.createObjectURL(event.target.files[0]);
  }
}
