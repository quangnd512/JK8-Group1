import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth-guard.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthService } from './components/service/auth.service';
import { ServiceComponent } from './components/service/service.component';
import { HomeComponent } from './pages/home/home.component';
import { homeService } from './pages/home/service.service';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ItemComponent } from './pages/product/item/item.component';
import { ProductComponent } from './pages/product/product.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ServiceComponent,
    ProductComponent,
    ItemComponent,
    PageNotFoundComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [homeService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
