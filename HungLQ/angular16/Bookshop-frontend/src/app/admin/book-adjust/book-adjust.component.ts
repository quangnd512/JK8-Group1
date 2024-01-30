import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { book } from 'src/app/service/book.service';
import { Category } from 'src/app/service/category.service';
import { BookService } from '../../service/book.service';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-book-adjust',
  templateUrl: './book-adjust.component.html',
  styleUrls: ['./book-adjust.component.css']
})
export class BookAdjustComponent implements OnInit {
  isImageUploaded:boolean
  isEditing:boolean = false;
  @ViewChild('bookForm') bookForm:NgForm ;
  message:string;
  book:book;
  categories:Category[];

  constructor(private BookService:BookService,private Router:ActivatedRoute, private CategoryService:CategoryService) {
    
  }

  ngOnInit(): void {
      const id = this.Router.snapshot.params['id'];
      this.CategoryService.getCategories().subscribe(
        (data) => this.categories = data
      )
      this.BookService.getById(id).subscribe(
        (data) => {
          this.book = data
        }
      )
    

  }

  changeBook(){
    const value = this.bookForm.value;
    console.log(value);
  }

  editSave() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      const fieldset = document.getElementsByTagName('fieldset')[0];
      fieldset.removeAttribute('disabled');
    } else {
      const fieldset = document.getElementsByTagName('fieldset')[0];
      fieldset.setAttribute('disabled',"");
      const x = document.getElementById('cover') as HTMLInputElement;
      x.type = 'hidden';
    }
  }

  preview(event: any) {
    const frame = document.getElementById('frame') as HTMLImageElement;
    frame.src = URL.createObjectURL(event.target.files[0]);
    this.isImageUploaded = true; // Reset the flag when a new image is selected
  }

}
