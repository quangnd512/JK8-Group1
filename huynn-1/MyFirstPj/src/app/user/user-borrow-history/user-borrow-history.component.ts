import {Component, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {CheckoutService} from "../../services/checkout.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule, CurrencyPipe, DatePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {animate, state, style, transition, trigger} from "@angular/animations";

const openCloseModal = trigger('openCloseModal', [
  state(
    'open',
    style({
      display: 'block',
    }),
  ),
  state(
    'close',
    style({
      display: 'none'
    })
  ),
  transition('open => close', [animate('1s ease-out')]),
  transition('close => open', [animate('1s ease-in')])
])

@Component({
  selector: 'app-user-borrow-history',
  standalone: true,
  imports: [
    MatTableModule,
    HttpClientModule,
    CurrencyPipe,
    DatePipe,
    MatIconModule,
    CommonModule
  ],
  providers: [
    CheckoutService
  ],
  animations: [
    openCloseModal
  ],
  templateUrl: './user-borrow-history.component.html',
  styleUrl: './user-borrow-history.component.scss'
})
export class UserBorrowHistoryComponent implements OnInit {

  displayedColumns: string[] = ['position', 'maPhieuMuon', 'maPhieuTra', 'ngayMuon', 'ngayTra',
    'soLuong', 'tongTien', 'trangThaiMuon', 'trangThaiTra', 'xemChiTietBtn'];

  displayedDeitalColums: string[] = ['maSach', 'tenSach', 'giaTien', 'theLoai', 'nhaXuatBan', 'tacGia'];

  public checkOutDatas: any[] = [];

  public checkOutData: any[] = [];

  public isShown: boolean = false;

  constructor(private checkoutService: CheckoutService) {
  }

  ngOnInit() {
    this.getCheckOutData();
  }

  public openCloseModal() {
    this.isShown = !this.isShown;
  }

  public getCheckOut(index: any) {
    if (index != null) {
      const foundItem = this.checkOutDatas.find((item, i) => i === index);
      this.checkOutData = [];
      if (foundItem) {
        this.checkOutData = foundItem.sachMuon;
        console.log(this.checkOutData);
      } else {
        console.error('Item not found at index:', index);
      }
    }
  }


  public getCheckOutData() {
    const accId = localStorage.getItem("userId");
    if (accId) {
      this.checkoutService.getALlCheckouts(accId).subscribe({
        next: value => {
          this.checkOutDatas = value;
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }
}
