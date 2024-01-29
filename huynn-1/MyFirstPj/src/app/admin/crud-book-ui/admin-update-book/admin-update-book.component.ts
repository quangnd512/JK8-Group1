import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Book } from '../../../services/interfaces/book';
import { HttpClientModule } from '@angular/common/http';
import { BookServices } from '../../../services/bookServices';
import { ListBookResponse } from '../../../services/interfaces/book/listBookResponse.interface';
import { BookResponse } from '../../../services/interfaces/book/bookResponse.interface';
import { addBookDto } from '../../../services/dto/addBookDto';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CloudinaryService} from "../../../services/cloudinary.service";

@Component({
  selector: 'app-admin-update-book',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MatProgressSpinnerModule],
  providers: [BookServices, CloudinaryService],
  templateUrl: './admin-update-book.component.html',
  styleUrls: ['./admin-update-book.component.scss']
})
export class AdminUpdateBookComponent implements OnInit {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private bookServices = inject(BookServices);

  private coudinaryService = inject(CloudinaryService);

  public book: BookResponse = {
    maSach: 0,
    tenSach: '',
    image: '',
    giaTien: 0,
    tacGia: '',
    soLuong: 0,
    nhaXuatBan: '',
    theLoai: '',
    ngayXuatBan: ''
  };

  public fileSelected: File | undefined;

  public loading: boolean = false;

  public name: string = "";

  public image: any = "";

  public author: string = "";

  public price: number = 0;

  public quantity: number = 0;

  public publishedDate: string = '';

  public publisher: string = '';

  public bookType: string = '';

  public validationError: string = '';

  constructor() {
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.fileSelected = file;
  }

  ngOnInit(): void {
    const bookIdParam: string | null = this.route.snapshot.paramMap.get('id');
    if (bookIdParam !== null) {
      const bookId = parseFloat(bookIdParam);
      this.bookServices.getBookById(bookId).subscribe((data) => {
        if (data) {
          this.book = data;
        }
      });
    }
  }

  // handling update book
  public updateBook() {
    const bookIdParam: string | null = this.route.snapshot.paramMap.get('id');

    if (bookIdParam !== null) {
      const bookId: number = parseFloat(bookIdParam);

      this.bookServices.getBookById(bookId).subscribe(
        (data) => {
          let book = data;

          if (book) {
            if (this.fileSelected) {
              this.loading = true;
              this.coudinaryService.uploadImage(this.fileSelected).subscribe((uploadData) => {
                this.image = uploadData.url; // Update the image URL
                this.updateBookData(bookId, book);
              });
            } else {
              // If no new file selected, proceed with existing data
              this.updateBookData(bookId, book);
              this.loading = false;
            }
          }
        }
      );
    }
  }

  private updateBookData(bookId: number, book: any) {

    const bookInput: addBookDto = {
      tenSach: this.name || book.tenSach,
      image: this.image || book.image,
      giaTien: this.price || book.giaTien,
      tacGia: { ten: this.author || book.tacGia },
      soLuong: this.quantity || book.soLuong,
      ngayXuatBan: this.publishedDate || book.ngayXuatBan,
      theLoai: { tenTheLoai: this.bookType || book.theLoai },
      nhaXuatBan: { tenNhaXuatBan: this.publisher || book.nhaXuatBan }
    };

    // Display a confirmation dialog
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn cập nhật thông tin này không?');

    if (isConfirmed) {
      // If the user confirms, perform the update
      this.bookServices.updateBook(bookId, bookInput).subscribe(
        {
          next: (value) => {
            if (value) {
              alert('Cập nhật thành công!');
              this.resetForm(); // Optionally, reset the form after successful update
              this.router.navigate(["/admin/book-list"]);
            }
          },
          error: err => {
            console.log(err);
            alert('Có lỗi xảy ra khi cập nhật!');
          }
        }
      );
    } else {
      console.log('Người dùng đã hủy cập nhật.');
    }
  }

  private resetForm() {
    // Reset form values to default or empty
    this.name = "";
    this.image = "";
    this.author = "";
    this.price = 0;
    this.quantity = 0;
    this.publishedDate = "";
    this.publisher = "";
    this.bookType = "";
    this.fileSelected = undefined;
  }


  public deletBook(bookId: number) {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa sách này không?');
    if (isConfirmed) {
      this.bookServices.deleteBook(bookId).subscribe(
        {
          next: (value) => {
            if (value) {
              alert("Xóa thành công");
              this.router.navigate(["/admin/book-list"]);
              return;
            }
          },
          error: (err) => {
            alert("Đã xảy ra lỗi");
            console.log(err);
            return;
          }
        }
      )
    }
  }
}
