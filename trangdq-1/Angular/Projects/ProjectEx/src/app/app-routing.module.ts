import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {Page404Component} from './shared/components/page404/page404.component';
import {LoginComponent} from './login/login.component';
import {AdminDashboardComponent} from './admin-dashboard/template/admin-dashboard.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {CheckOutComponent} from "./check-out/check-out.component";
import {OrderHistoryComponent} from "./order-history/order-history.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'product/:id', component: ProductDetailsComponent, canActivate: [AuthGuard]},
  {path: 'my-shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  {path: 'checkout', component: CheckOutComponent, canActivate: [AuthGuard]},
  {path: 'my-orders', component: OrderHistoryComponent, canActivate: [AuthGuard]},

  {path: 'admin-dashboard', redirectTo: 'admin-dashboard/products-manager/1', pathMatch: 'full'},
  {
    path: 'admin-dashboard/:board/:page',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
  },

  {path: '', redirectTo: 'home/1', pathMatch: 'full'},
  {path: 'home', redirectTo: 'home/1', pathMatch: 'full'},
  {path: 'home/:page', component: HomeComponent, canActivate: [AuthGuard]},

  {path: '**', component: Page404Component},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
