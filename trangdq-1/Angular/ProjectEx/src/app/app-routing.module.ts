import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {Page404Component} from './shared/components/page404/page404.component';
import {LoginComponent} from './login/login.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AuthGuard} from './shared/services/auth/auth.guard';
import {ProductDetailsComponent} from './product-details/product-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: '**', component: Page404Component },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
