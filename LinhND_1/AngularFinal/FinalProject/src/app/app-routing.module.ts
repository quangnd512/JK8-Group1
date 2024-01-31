import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/user/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { AdminHomeComponent } from './layout/admin/admin-home/admin-home.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'ad',
    loadChildren: () => import('./layout/admin/admin/admin.module').then(m => m.AdminModule),
   component: AdminHomeComponent, canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
