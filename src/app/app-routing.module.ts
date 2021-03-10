import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from './auth/auth.guard';



const routes: Routes = [
  {path:'' , component:UserLoginComponent},
  {path:'userList',canActivate: [AuthGuard],loadChildren: () => import(`./user-list/user-list.module`).then(m => m.UserListModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
