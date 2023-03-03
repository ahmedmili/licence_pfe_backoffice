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
const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
    //   redirecte to the first Page
    //  {path:'',pathMatch:'full',redirectTo:'/users'},
     {path:'profile',component:ProfileComponent},
     {path:'users',component:UsersComponent},
     {path:'paniers',component:PaniersComponent},
     {path: 'paniers/create', component: PanierCreateComponent}
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
