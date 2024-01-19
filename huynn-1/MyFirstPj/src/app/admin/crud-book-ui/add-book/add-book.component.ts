import { Component, OnInit, inject } from '@angular/core';
import { AdminHeaderComponent } from '../../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../../services/interfaces/book';
import { BookServices } from '../../../services/bookServices';
import { HttpClientModule } from '@angular/common/http';
import { addBookDto } from '../../../services/dto/addBookDto';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-book.component.html',
  providers: [BookServices],
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent implements OnInit {

  private bookServices = inject(BookServices);

  public name: string = "";

  public image: any = "";

  public author: string = "";

  public price: number = 0;

  public quantity: number = 0;

  public publishedDate: string = '';

  public publisher: string = '';

  public bookType: string = '';

  public validationError: string = '';

  public addBookErr = {
    nameErr: '',
    authorErr: '',
    priceErr: '',
    quantityErr: '',
    publishedDateErr: '',
    publisherErr: '',
    bookTypeErr: ''
  }

  constructor() {

  }

  ngOnInit(): void {

  }

  public validateInput(bookData: addBookDto): boolean {
    if (this.name === '') {
      this.addBookErr.nameErr = 'Vui lòng nhập tên sách';
      return false;
    }
    this.addBookErr.nameErr = '';

    if (this.author === '') {
      this.addBookErr.authorErr = 'Vui lòng nhập tác giả';
      return false;
    }
    this.addBookErr.authorErr = '';

    if (isNaN(this.price)) {
      this.addBookErr.priceErr = 'Giá tiền phải là một số';
      return false;
    }
    this.addBookErr.priceErr = '';

    if (isNaN(this.quantity)) {
      this.addBookErr.quantityErr = 'Số lượng phải là một số';
      return false;
    }
    this.addBookErr.quantityErr = '';

    if (!this.publishedDate) {
      this.addBookErr.publishedDateErr = 'Vui lòng chọn ngày xuất bản';
      return false;
    }
    this.addBookErr.publishedDateErr = '';

    if (this.publisher === '') {
      this.addBookErr.publisherErr = 'Vui lòng nhập nhà xuất bản';
      return false;
    }
    this.addBookErr.publisherErr = '';

    if (this.bookType === '') {
      this.addBookErr.bookTypeErr = 'Vui lòng nhập thể loại sách';
      return false;
    }
    this.addBookErr.bookTypeErr = '';

    return true;
  }



  public addBook() {
    let bookData: addBookDto = {
      tenSach: this.name,
      tacGia: { ten: this.author },
      theLoai: { tenTheLoai: this.bookType, daXoa: false, maTheLoai: "" },
      image: this.image,
      giaTien: this.price,
      ngayXuatBan: this.publishedDate,
      nhaXuatBan: { tenNhaXuatBan: this.publisher },
      soLuong: this.quantity
    }

    if (this.validateInput(bookData)) {
      this.bookServices.addNewBook(bookData).subscribe(
        {
          next: (value) => {
            if (value != undefined) {
              alert("Thêm phẩm thành công");
              return;
            }
          },
          error: err => {
            alert("Thêm thất bại");
            return;
          }
        }
      );
    }
  }

}
