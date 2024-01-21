import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../services/userServices';
import { HttpClientModule } from '@angular/common/http';
import { GetUserDto } from '../../../services/dto/getUserDto';
import { Router, RouterLink } from '@angular/router';

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
    this.userServices.getAllUsers().subscribe((data) => {
      this.userList = data;
    })
  }

  public navigateUpdateUser(userId: number) {
    this.router.navigate(["/admin/update-user", { userId: userId }])
  }

}
