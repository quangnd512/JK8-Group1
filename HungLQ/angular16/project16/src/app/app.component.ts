import { Component } from '@angular/core';
import { homeService } from './pages/home/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  homeService:homeService;

  constructor(homeService: homeService){
    this.homeService = homeService;
  }

  public hi (){
    console.log(homeService.prototype.hi);
  }

  title = 'project16';
}
