import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // providers: [AuthService]
})
export class HeaderComponent {
  constructor(private router:Router, private authService: AuthService){
  }

  getHome(){
    this.router.navigate(['/home'])
  }

  getProduct(){
    this.router.navigate(['product']);
  }

  login(){
    this.router.navigate(['login']);
  }

  logout(){
  }



}
