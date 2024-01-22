import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemComponent } from './pages/product/item/item.component';
import { ProductComponent } from './pages/product/product.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"product",
  // canActivate: [AuthGuard],
  // canActivateChild: [AuthGuard],
  component: ProductComponent, children: [
    {path: ":id/:name", component: ItemComponent},
  ]},
  {path:"not-found", component: PageNotFoundComponent},
  {path:"**", redirectTo: "/not-found"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
