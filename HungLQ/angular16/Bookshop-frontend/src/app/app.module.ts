import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { HistoryCheckoutComponent } from './pages/history-checkout/history-checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderComponent } from './pages/order/order.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { CategoryHomeComponent } from './pages/home/category-home/category-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    BookDetailComponent,
    UserDetailComponent,
    OrderComponent,
    CheckoutComponent,
    HistoryCheckoutComponent,
    CategoryHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
