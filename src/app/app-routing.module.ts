import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SecureComponent} from './secure/secure.component';
import {PublicComponent} from './public/public.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { UsersComponent } from './secure/users/users.component';
import { UserCreateComponent } from './secure/users/user-create/user-create.component';
import { UserEditComponent } from './secure/users/user-edit/user-edit.component';
import { OrdersComponent } from './secure/orders/orders.component';
import { OrderCreateComponent } from './secure/orders/order-create/order-create.component';
import { OrderEditComponent } from './secure/orders/order-edit/order-edit.component';
import { OrderDetailsComponent } from './secure/orders/order-details/order-details.component';
import { BoxCreateComponent } from './secure/boxs/box-create/box-create.component';
import { BoxsComponent } from './secure/boxs/boxs.component';
import { BoxEditComponent } from './secure/boxs/box-edit/box-edit.component';
import { PartnersComponent } from './secure/partners/partners.component';
import { PartnerCreateComponent } from './secure/partners/partner-create/partner-create.component';
import { PartnerEditComponent } from './secure/partners/partner-edit/partner-edit.component';
import { PartnerDetailsComponent } from './secure/partners/partner-details/partner-details.component';
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
     {path:'boxs',component:BoxsComponent},
     {path: 'boxs/create', component: BoxCreateComponent},
     {path: 'boxs/:id/edit', component: BoxEditComponent},
     {path:'orders',component:OrdersComponent},
     {path: 'orders/create', component: OrderCreateComponent},
     {path: 'orders/:id/edit', component: OrderEditComponent},
     {path: 'orders/:id/details', component: OrderDetailsComponent},
     {path:'partners',component:PartnersComponent},
     {path:'partners/create',component:PartnerCreateComponent},
     {path: 'partners/:id/edit', component: PartnerEditComponent},
     {path: 'partners/:id/details', component: PartnerDetailsComponent},
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
