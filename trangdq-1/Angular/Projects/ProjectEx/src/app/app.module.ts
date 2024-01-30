import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from "@angular/material/icon";
// import { withFetch } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AdminDashboardComponent} from './admin-dashboard/template/admin-dashboard.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {Page404Component} from './shared/components/page404/page404.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductManagerComponent} from './admin-dashboard/product-manager/product-manager.component';
import {UserManagerComponent} from './admin-dashboard/user-manager/user-manager.component';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PaginationComponent} from './shared/components/pagination/pagination.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {OrderManagerComponent} from './admin-dashboard/order-manager/order-manager.component';
import {OrderHistoryComponent} from './order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminDashboardComponent,
    HeaderComponent,
    Page404Component,
    FooterComponent,
    ProductDetailsComponent,
    ProductManagerComponent,
    UserManagerComponent,
    LoaderComponent,
    PaginationComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderManagerComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
