import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [BsDropdownModule, RouterModule, RouterLink, RouterLinkActive, RouterOutlet, FontAwesomeModule, CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent implements OnInit {
  public faUser = faUser;

  public isAdmin: boolean = false;

  constructor() {

  }

  ngOnInit(): void {
    this.isAdmin = this.checkIsAdmin();
  }

  public checkIsAdmin() {
    return localStorage.getItem('token') === "ADMIN";
  }
}
