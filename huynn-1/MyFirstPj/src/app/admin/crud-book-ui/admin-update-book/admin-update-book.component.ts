import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../services/interfaces/book';
import { HttpClientModule } from '@angular/common/http';
import { BookServices } from '../../../services/bookServices';
import { ListBookResponse } from '../../../services/interfaces/book/listBookResponse.interface';
import { BookResponse } from '../../../services/interfaces/book/bookResponse.interface';
import { addBookDto } from '../../../services/dto/addBookDto';

@Component({
  selector: 'app-admin-update-book',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [BookServices],
  templateUrl: './admin-update-book.component.html',
  styleUrls: ['./admin-update-book.component.scss']
})
export class AdminUpdateBookComponent implements OnInit {

  private route = inject(ActivatedRoute);

  private bookServices = inject(BookServices);

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

            const bookInput: addBookDto = {
              tenSach: this.name ? this.name : book.tenSach,
              image: this.image ? this.image : book?.image,
              giaTien: this.price ? this.price : book?.giaTien,
              tacGia: { ten: this.author ? this.author : book?.tacGia },
              soLuong: this.quantity ? this.quantity : book?.soLuong,
              ngayXuatBan: this.publishedDate ? this.publishedDate : book?.ngayXuatBan,
              theLoai: { tenTheLoai: this.bookType ? this.bookType : book?.theLoai },
              nhaXuatBan: { tenNhaXuatBan: this.publisher ? this.publisher : book?.nhaXuatBan }
            };

            // Hiển thị hộp thoại xác nhận
            const isConfirmed = window.confirm('Bạn có chắc chắn muốn cập nhật thông tin này không?');

            if (isConfirmed) {
              // Nếu người dùng chấp nhận xác nhận, thực hiện cập nhật
              this.bookServices.updateBook(bookId, bookInput).subscribe(
                {
                  next: (value) => {
                    if (value) {
                      alert('Cập nhật thành công!');
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

        }
      );
    }
  }

  public deletBook(bookId: number | undefined) {
    // const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa sách này không?');
    // if (isConfirmed) {
    //   this.bookServices.deleteBook(bookId).subscribe(
    //     {
    //       next: (value) => {
    //         if (value) {
    //           alert("Xóa thành công");
    //           return;
    //         }
    //       },
    //       error: (err) => {
    //         alert("Đã xảy ra lỗi");
    //         console.log(err);
    //         return;
    //       }
    //     }
    //   )
    // }
  }
}
