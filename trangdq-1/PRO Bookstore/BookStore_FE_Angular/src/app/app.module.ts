import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from "@angular/material/icon";
// import { withFetch } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {AdminDashboardComponent} from './admin-dashboard/template/admin-dashboard.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {Page404Component} from './shared/components/page404/page404.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductManagerComponent} from './admin-dashboard/product-manager/product-manager.component';
import {UserManagerComponent} from './admin-dashboard/user-manager/user-manager.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PaginationComponent} from './shared/components/pagination/pagination.component';
import {ShoppingCartComponent} from './user-functionality/shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './user-functionality/check-out/check-out.component';
import {OrderManagerComponent} from './admin-dashboard/order-manager/order-manager.component';
import {OrderHistoryComponent} from './user-functionality/order-history/order-history.component';
import {DiscountedDirective} from './shared/directives/discounted.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DisplayedDirective} from './shared/directives/displayed.directive';
import {RegisterComponent} from './auth/register/register.component';
import {VoucherManagerComponent} from './admin-dashboard/voucher-manager/voucher-manager.component';
import {ProfileComponent} from './user-functionality/profile/profile.component';
import {StatusColoredDirective} from './shared/directives/status-colored.directive';

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
    ProfileComponent,
    UserManagerComponent,
    PaginationComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderManagerComponent,
    OrderHistoryComponent,
    DiscountedDirective,
    DisplayedDirective,
    RegisterComponent,
    VoucherManagerComponent,
    ProfileComponent,
    StatusColoredDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
