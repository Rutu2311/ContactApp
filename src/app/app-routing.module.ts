import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component'
import { AuthGuard } from './Services/auth.guard';
import { PreventDashToLoginGuard } from './Services/prevent-dash-to-login.guard';
import { PreventDashToSignupGuard } from './Services/prevent-dash-to-signup.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PreventDashToLoginGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [PreventDashToSignupGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
