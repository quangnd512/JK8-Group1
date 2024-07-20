import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {Page404Component} from './shared/components/page404/page404.component';
import {LoginComponent} from './auth/login/login.component';
import {AdminDashboardComponent} from './admin-dashboard/template/admin-dashboard.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ShoppingCartComponent} from "./user-functionality/shopping-cart/shopping-cart.component";
import {CheckOutComponent} from "./user-functionality/check-out/check-out.component";
import {OrderHistoryComponent} from "./user-functionality/order-history/order-history.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ProfileComponent} from "./user-functionality/profile/profile.component";

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'my-shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  {path: 'checkout', component: CheckOutComponent, canActivate: [AuthGuard]},
  {path: 'my-profile', component: ProfileComponent, canActivate: [AuthGuard]},

  {path: 'my-orders', redirectTo: 'my-orders/1', pathMatch: 'full'},
  {path: 'my-orders/:page', component: OrderHistoryComponent, canActivate: [AuthGuard]},

  {path: 'success', component: Page404Component},
  {path: 'cancel', component: Page404Component},

  {path: 'admin-dashboard', redirectTo: 'admin-dashboard/products-manager/1', pathMatch: 'full'},
  {path: 'admin-dashboard/:board/:page', component: AdminDashboardComponent, canActivate: [AuthGuard]},

  {path: '', redirectTo: 'home/1', pathMatch: 'full'},
  {path: 'home', redirectTo: 'home/1', pathMatch: 'full'},
  {path: 'home/:page', component: HomeComponent},
  {path: 'product/:id', component: ProductDetailsComponent},

  {path: '**', component: Page404Component},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
