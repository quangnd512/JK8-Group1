import { Component } from '@angular/core';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home-header-main',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './home-header-main.component.html',
  styleUrls: [
    '../home.component.scss'
  ]
})
export class HomeHeaderMainComponent {

    protected readonly faUser = faUser;
}
