import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/userServices";
import {HttpClientModule} from "@angular/common/http";
import {error} from "console";
import {DatePipe} from "@angular/common";
import {MatSidenavModule} from "@angular/material/sidenav";

@Component({
  selector: 'app-user-update-info',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, DatePipe, MatSidenavModule],
  providers: [
    UserService
  ],
  templateUrl: './user-update-info.component.html',
  styleUrl: './user-update-info.component.scss'
})
export class UserUpdateInfoComponent implements OnInit{

  userInfoForm: FormGroup;

  user: any;
  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.userInfoForm = this.formBuilder.group({
      ten: ['', Validators.required],
      ngaySinh: ['', Validators.required],
      sdt: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Sử dụng mảng để chứa cả Validators.required và Validators.email
      diaChi: ['', Validators.required],
      taiKhoan: {}
    });
  }


  ngOnInit() {
    this.getUser();
  }

  public getUser() {
    const id: any = localStorage.getItem("userId");
    if (id) {
      this.userService.getUserById(id).subscribe({
        next: value => {
          this.user = value;
          console.log(this.user);
        }, error: error => {
          console.log(error);
        }
      })
    }
    return;
  }

  public onSubmit() {
    const id = localStorage.getItem("userId")
    if (id) {
      this.userService.updateUser(this.userInfoForm.value, id).subscribe({
        next: value => {
          alert("Cập nhật thành công");
        }, error: err => {
          alert("Cập nhật thất bại");
        }
      })
    }
  }


}
