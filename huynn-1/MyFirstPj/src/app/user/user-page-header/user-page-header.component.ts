import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {UserBorrowHistoryComponent} from "../user-borrow-history/user-borrow-history.component";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {UserUpdateInfoComponent} from "../user-update-info/user-update-info.component";

@Component({
  selector: 'app-user-page-header',
  standalone: true,
  imports: [UserBorrowHistoryComponent,
  RouterLink,
  CommonModule],
  templateUrl: './user-page-header.component.html',
  styleUrl: './user-page-header.component.scss'
})
export class UserPageHeaderComponent implements OnInit {

  @ViewChild('container', {
    read: ViewContainerRef,
    static: true
  }) container: ViewContainerRef | undefined;

  constructor() {
  }

  ngOnInit() {
    this.addBorrowBookComponent();
  }

  addBorrowBookComponent () {
    this.container?.clear();
    const component = this.container?.createComponent(UserBorrowHistoryComponent);
  }

  addUpdateUserInforComponent() {
    this.container?.clear();
    const component = this.container?.createComponent(UserUpdateInfoComponent);
  }
}
