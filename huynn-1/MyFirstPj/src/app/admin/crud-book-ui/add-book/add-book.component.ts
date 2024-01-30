import {Component, inject, OnInit} from '@angular/core';
import {AdminHeaderComponent} from '../../admin-header/admin-header.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BookServices} from '../../../services/bookServices';
import {HttpClientModule} from '@angular/common/http';
import {addBookDto} from '../../../services/dto/addBookDto';
import {BookType} from "../../../services/constants/book-type";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {CloudinaryService} from "../../../services/cloudinary.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, FormsModule, HttpClientModule, MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule],
  templateUrl: './add-book.component.html',
  providers: [BookServices,
    CloudinaryService],
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent implements OnInit {

  private bookServices = inject(BookServices);

  private coudinaryService = inject(CloudinaryService);

  public name: string = "";

  public image: any = "";

  public author: string = "";

  public price: number = 0;

  public quantity: number = 0;

  public publishedDate: string = '';

  public publisher: string = '';

  public bookType: string = '';

  public fileSelected: File | undefined;

  public loading: boolean = false;

  public addBookErr = {
    nameErr: '',
    authorErr: '',
    priceErr: '',
    quantityErr: '',
    publishedDateErr: '',
    publisherErr: '',
    bookTypeErr: ''
  };

  bookTypes: any[] = [
    {value: BookType.THO, viewValue: BookType.THO},
    {value: BookType.TRUYEN_NGAN, viewValue: BookType.TRUYEN_NGAN}
  ];

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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.fileSelected = file;
  }


  public addBook() {
    if (this.fileSelected) {
      this.coudinaryService.uploadImage(this.fileSelected).subscribe((data) => {
        let bookData: addBookDto = {
          tenSach: this.name,
          tacGia: {ten: this.author},
          theLoai: {tenTheLoai: this.bookType, daXoa: false, maTheLoai: ""},
          image: data.url,
          giaTien: this.price,
          ngayXuatBan: this.publishedDate,
          nhaXuatBan: {tenNhaXuatBan: this.publisher},
          soLuong: this.quantity
        }

        if (this.validateInput(bookData)) {
          this.loading = true;
          this.bookServices.addNewBook(bookData).subscribe(
            {
              next: (value) => {
                if (value != undefined) {
                  alert("Thêm phẩm thành công");
                  this.loading = false;
                  this.name = "";
                  this.image = "";
                  this.author = "";
                  this.price = 0;
                  this.quantity = 0;
                  this.publishedDate = "";
                  this.publisher = "";
                  this.bookType = "";
                  this.fileSelected = undefined;
                  return;
                }
              },
              error: err => {
                alert("Thêm thất bại");
                this.loading = false;
                return;
              }
            }
          );
        }
      })
    } else {
      alert("Vui lòng chọn ảnh");
    }
  }
}
