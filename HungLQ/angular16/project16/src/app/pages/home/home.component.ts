import { Component, Injectable } from '@angular/core';
import { AuthService } from 'src/app/components/service/auth.service';
import { homeService } from './service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // providers: [homeService]
})

@Injectable()
export class HomeComponent {

  homeService:homeService;

  constructor(homeService:homeService){
    this.homeService = homeService;
  }

  //  property binding
  tmp: string = 'number';
  //  event binding
  handle = () => {
    console.log('hi');
  };
  // class binding
  classes: string[] = ['container', 'row'];

  // get Product
  public getProduct(){
    
  }





}
