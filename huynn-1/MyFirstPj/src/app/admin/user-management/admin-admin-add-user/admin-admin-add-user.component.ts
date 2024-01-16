import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../services/userServices';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserInfos } from '../../../services/interfaces/userInfo';
import { response } from 'express';

@Component({
  selector: 'app-admin-admin-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  providers: [
    UserService
  ],
  templateUrl: './admin-admin-add-user.component.html',
  styleUrl: './admin-admin-add-user.component.scss'
})
export class AdminAdminAddUserComponent {

  private userServices = inject(UserService);

  constructor() {

  }

  userRoles = [
    { value: 'ADMIN', viewValue: 'ADMIN' },
    { value: 'USER', viewValue: 'USER' },
  ];

  public submitData(userData: NgForm) {
    const user: UserInfos = userData.value;
    this.userServices.createUser(user).subscribe(
      {
        next: (value) => {
          alert("Tạo người dùng thành công");
          console.log(value);
        },
        error: (err) => {
          alert(err);
          console.log(err);
        }
      }
    );
  }

}
