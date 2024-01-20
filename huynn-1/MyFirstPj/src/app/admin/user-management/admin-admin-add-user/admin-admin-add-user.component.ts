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
import { AddAccountDto } from '../../../services/dto/addAccountDto';
import { AuthenticationServices } from '../../../services/loginServices';

@Component({
  selector: 'app-admin-admin-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  providers: [
    UserService,
    AuthenticationServices
  ],
  templateUrl: './admin-admin-add-user.component.html',
  styleUrl: './admin-admin-add-user.component.scss'
})
export class AdminAdminAddUserComponent {

  private userServices = inject(UserService);

  private authenServices = inject(AuthenticationServices);

  public inputErr = {
    usernameErr: '',
    passwordErr: '',
    comfirmPasswordErr: '',
    roleErr: ''
  }

  constructor() {

  }

  userRoles = [
    { value: 'ADMIN', viewValue: 'ADMIN' },
    { value: 'NGUOI_DUNG', viewValue: 'USER' },
  ];

  public submitData(userData: NgForm) {
    const account: AddAccountDto = userData.value;

    this.validateInputData(account);

    if (this.inputErr.usernameErr === '' && this.inputErr.passwordErr === '' &&
      this.inputErr.comfirmPasswordErr === '') {
      this.authenServices.addAccount(account).subscribe(
        {
          next: (value) => {
            alert("Tạo tài khoản thành công");
            console.log(value);
            return;
          },
          error: (err) => {
            alert(err);
            console.log(err);
            return;
          }
        }
      );
    }
    return;
  }

  public validateInputData(inputData: AddAccountDto) {

    if (inputData.tenTk === '') {
      this.inputErr.usernameErr = 'Vui lòng nhập tên tài khoản';
    } else {
      this.inputErr.usernameErr = '';
    }

    if (inputData.matKhau === '') {
      this.inputErr.passwordErr = 'Vui lòng nhập mật khẩu';
    } else {
      this.inputErr.passwordErr = '';
    }

    if (inputData.nhapLaiMk === '') {
      this.inputErr.comfirmPasswordErr = 'Vui lòng nhập trường này';
    } else {
      this.inputErr.comfirmPasswordErr = '';
    }
    
    if (inputData.role === '') {
      this.inputErr.roleErr = 'Vui lòng nhập trường này';
    } else {
      this.inputErr.roleErr = '';
    }

    if (inputData.matKhau != inputData.nhapLaiMk) {
      this.inputErr.comfirmPasswordErr = 'Mật khẩu không khớp';
    } else {
      this.inputErr.comfirmPasswordErr = '';
    }

  }

}
