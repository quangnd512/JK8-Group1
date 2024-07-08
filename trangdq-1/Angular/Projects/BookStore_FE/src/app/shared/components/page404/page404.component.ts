import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.scss'
})
export class Page404Component {
  @Input()
  public title = 'Page Not Found'
  @Input()
  public message = "It seems like you've stumbled upon a page that doesn't exist."
  @Input()
  public imageLink = 'assets/sad-meme.jpg'
}
