import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SecureComponent} from './secure/secure.component';
import {PublicComponent} from './public/public.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { UsersComponent } from './secure/users/users.component';
import { PaniersComponent } from './secure/paniers/paniers.component';
import { PanierCreateComponent } from './secure/paniers/panier-create/panier-create.component';
import { PanierEditComponent } from './secure/paniers/panier-edit/panier-edit.component';
import { UserCreateComponent } from './secure/users/user-create/user-create.component';
import { UserEditComponent } from './secure/users/user-edit/user-edit.component';
const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
    //   redirecte to the first Page
    //  {path:'',pathMatch:'full',redirectTo:'/users'},
     {path:'profile',component:ProfileComponent},
     {path:'users',component:UsersComponent},
     {path: 'users/create', component: UserCreateComponent},
     {path: 'users/:id/edit', component: UserEditComponent},
     {path:'paniers',component:PaniersComponent},
     {path: 'paniers/create', component: PanierCreateComponent},
     {path: 'paniers/:id/edit', component: PanierEditComponent},
    ]
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
