import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { BookRecieptServices } from '../../services/bookRecieptServices';
import { GetBorrowBookReciptsDto } from '../../services/dto/getBookBorrowReciptsDto';
import { GetReturnBookReciptsDto } from '../../services/dto/getReturnBookRecieptsDto';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-list-issue',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FontAwesomeModule, MatCheckboxModule, FormsModule],
  providers: [BookRecieptServices],
  templateUrl: './admin-list-issue.component.html',
  styleUrl: './admin-list-issue.component.scss'
})
export class AdminListIssueComponent implements OnInit {

  private bookReciptServices = inject(BookRecieptServices);

  public bookBorrowReciepts: GetBorrowBookReciptsDto[] = [];

  public bookReturnReciepts: GetReturnBookReciptsDto[] = [];

  public bookBorrowReciept: GetBorrowBookReciptsDto = {
    maPhieuMuon: 0,
    hinhThucMuonTra: '',
    hinhThucThanhToan: null,
    ngayMuon: '',
    tongTien: 0,
    soLuong: 0,
    nhanVien: null,
    docGia: null,
    sachs: [],
    trang_thai: false,
  };

  public faRotateRight = faRotateRight;

  public selectAll = false;

  public bookListToReturn: number[] = [];

  constructor() {

  }

  ngOnInit(): void {
    this.getBorrowRecipts();
    this.getReturnReciepts();
  }

  public getBorrowRecipts() {
    this.bookReciptServices.getBookBorrowRecipts().subscribe({
      next: value => {
        this.bookBorrowReciepts = value;
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
      }
    })
  }

  public getReturnReciepts() {
    this.bookReciptServices.getBookReturnRecipts().subscribe({
      next: value => {
        this.bookReturnReciepts = value;
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
      }
    })
  }

  // click to display model
  public getBorrowBookReciept(id: any) {

    this.bookListToReturn = [];

    let modalBody = document.querySelector(".modal-content");
    var isVisible = modalBody?.classList.contains('isHide');

    if (isVisible) {
      modalBody?.classList.remove('isHide');
    } else {
      modalBody?.classList.add('isHide');
    }

    this.bookReciptServices.getBookBorrowRecipt(id).subscribe(data => {
      this.bookBorrowReciept = data;
      console.log(this.bookBorrowReciept);
    })
  }

  // click to display model
  public openModal() {

    this.bookListToReturn = [];

    this.selectAll = false;

    let modalBody = document.querySelector(".modal-content");
    var isVisible = modalBody?.classList.contains('isHide');


    if (isVisible) {
      modalBody?.classList.remove('isHide');
    } else {
      modalBody?.classList.add('isHide');
    }
  }

  //select book all to return
  updateAllComplete() {
    this.selectAll = this.bookBorrowReciept.sachs != null && this.bookBorrowReciept.sachs.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.bookBorrowReciept.sachs == null) {
      return false;
    }
    return this.bookBorrowReciept.sachs.filter(t => t.completed).length > 0 && !this.selectAll;
  }

  setAll(completed: boolean) {
    this.selectAll = completed;

    if (this.bookBorrowReciept.sachs == null) {
      return;
    }

    if (completed) {
      this.bookListToReturn = this.bookBorrowReciept.sachs.map(book => book.maSach);
    } else {
      this.bookListToReturn = [];
    }
  }

  //get value of book selected
  public handleBookSelection(bookId: number) {
    const selectedBook = this.bookBorrowReciept.sachs.find(book => book.maSach === bookId).maSach;

    this.bookListToReturn.push(selectedBook);
  }


  //handle return book that was choosen
  public returnBookConfirm() {

    let data = {
      maPhieuTra: this.bookBorrowReciept.maPhieuMuon,
      maPhieuMuon: this.bookBorrowReciept.maPhieuMuon,
      idSachs: this.bookListToReturn
    }

    console.log(data);

    if (data.idSachs.length == 0) {
      alert("Vui lòng chọn sách");
      return;
    }
    this.bookReciptServices.createBookReturnRecipt(data).subscribe({
      next: value => {
        if (value) {
          alert("Đã xác nhận trả sách");
          this.getReturnReciepts();
          this.getBorrowRecipts();
        }
      },
      error: err => {
        alert("Đã xảy ra lỗi ");
        console.log(err);
      }
    })
  }
}
