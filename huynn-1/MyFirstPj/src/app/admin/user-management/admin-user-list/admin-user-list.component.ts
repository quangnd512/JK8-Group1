import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../services/userServices';
import { HttpClientModule } from '@angular/common/http';
import { GetUserDto } from '../../../services/dto/getUserDto';
import { Router, RouterLink } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  providers: [UserService],
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.scss'
})
export class AdminUserListComponent implements OnInit {

  private router = inject(Router);

  private userServices = inject(UserService);

  public userList: GetUserDto[] = [];

  constructor() {

  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers() {
    this.userServices.getAllUsers().subscribe((data) => {
      this.userList = data;
    })
  }

  public navigateUpdateUser(userId: number) {
    this.router.navigate(["/admin/update-user", { userId: userId }])
  }

  // handle delete btn
  public deleteUserBtn(maTk: any) {
    if (maTk) {
      // Hiển thị hộp thoại xác nhận
      const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa?");

      if (isConfirmed) {
        this.userServices.deleteUser(maTk).subscribe({
          next: value => {
            alert("Đã xóa thành công");
            this.getAllUsers();
          },
          error: err => {
            alert("Đã xảy ra lỗi");
          }
        });
      }
    }
  }

}
