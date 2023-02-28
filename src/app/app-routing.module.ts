import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SecureComponent} from './secure/secure.component';
import {PublicComponent} from './public/public.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
     
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
