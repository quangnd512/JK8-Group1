import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; 
import { MatCard, MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatHint } from '@angular/material/input';
import { MatError } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatList, MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './layout/user/home/home.component';
import { AdminHomeComponent } from './layout/admin/admin-home/admin-home.component';
import { AdminHeaderComponent } from './shared/admin/admin-header/admin-header.component';
import { AdminNavBarComponent } from './shared/admin/admin-nav-bar/admin-nav-bar.component';
import { AdminFooterComponent } from './shared/admin/admin-footer/admin-footer.component';
import { HeaderComponent } from './shared/user/header/header.component';
import { FooterComponent } from './shared/user/footer/footer.component';
import { MenuBarComponent } from './shared/user/header/menu-bar/menu-bar.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/user/register/register.component';
import { AdminCategoryComponent } from './layout/admin/admin-category/admin-category.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    HomeComponent,
    AdminHeaderComponent,
    AdminNavBarComponent,
    AdminFooterComponent,
    HeaderComponent,
    FooterComponent,
    MenuBarComponent,
    LoginComponent,
    RegisterComponent,
    AdminCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatHint,
    MatError,
    FlexLayoutModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginator,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
