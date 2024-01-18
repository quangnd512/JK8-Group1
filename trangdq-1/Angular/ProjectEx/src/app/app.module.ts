import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import {CommonModule} from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
// import { withFetch } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {Page404Component} from './shared/components/page404/page404.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {ProductDetailsComponent} from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminDashboardComponent,
    HeaderComponent,
    Page404Component,
    FooterComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
