import { Component } from '@angular/core';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AddBookComponent } from './crud-book-ui/add-book/add-book.component';
import { AdminBookListComponent } from './crud-book-ui/admin-book-list/admin-book-list.component';
import { AdminAdminAddUserComponent } from './user-management/admin-admin-add-user/admin-admin-add-user.component';
import { AdminListIssueComponent } from './admin-list-issue/admin-list-issue.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminHeaderComponent, AddBookComponent, AdminBookListComponent, AdminAdminAddUserComponent, AdminListIssueComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
