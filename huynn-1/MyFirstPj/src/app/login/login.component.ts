import { CommonModule } from '@angular/common';
import { Component, Directive, Input, OnInit, Pipe, inject } from '@angular/core';
import { AuthenticationServices } from '../services/loginServices';
import { UserService } from '../services/userServices';
import { UserInfos } from '../services/interfaces/userInfo';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule, NgForm, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginInterface } from '../services/interfaces/login/login.interface';
import { LoginResponseInterface } from '../services/interfaces/login/loginResponse.interface';
import { response } from 'express';
import { ROLE_ADMIN, ROLE_USER } from '../services/common/constant';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AuthenticationServices, UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  private authenticationServices = inject(AuthenticationServices);

  private router = inject(Router);

  public username: string = "";

  public password: string = "";

  public passworrdErr: string = '';

  public usernameErr: string = '';

  constructor() {
  }

  ngOnInit(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    
  }

  //handling response
  public login(loginForm: NgForm) {

    const loginData: LoginInterface = loginForm.value;

    if (loginData.username == '') {
      this.usernameErr = 'Vui lòng nhập trường này';
      return;
    }

    this.usernameErr = '';

    if (this.validatePassword(loginData.password) !== '') {
      this.passworrdErr = this.validatePassword(this.password);
      return;
    }

    this.passworrdErr = '';

    this.authenticationServices.login(loginData).subscribe((response) => {
      if (response != null) {
        if (response.role === ROLE_USER) {
          localStorage.setItem('token', ROLE_USER);
          localStorage.setItem('username', response.tenTk);
          localStorage.setItem('userId', response.maTk);
          this.router.navigateByUrl("/home")
          return;
        } else if (response.role === ROLE_ADMIN) {
          localStorage.setItem('token', ROLE_ADMIN);
          localStorage.setItem('username', response.tenTk);
          localStorage.setItem('userId', response.maTk);
          this.router.navigateByUrl("/admin");
          return;
        }

      } else {
        alert("Người dùng không tồn tại");
        return;
      }
    }
    );
    return;
  }

  public validatePassword(password: string): string {
    if (password.length < 8) {
      return "Mật khẩu phải có ít nhất 8 ký tự";
    }

    if (password.charAt(0) !== password.charAt(0).toLocaleUpperCase()) {
      return 'Mật khẩu phải có ít nhất một chữ cái viết hoa';
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Mật khẩu không được chứa các ký tự đặc biệt và số';
    }

    if (/\d/.test(password)) {
      return 'Mật khẩu không được chứa các ký tự đặc biệt và số';
    }

    return '';
  }

}
