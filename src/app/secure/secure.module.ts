import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {NavComponent} from './nav/nav.component';
import {MenuComponent} from './menu/menu.component';
import {SecureComponent} from './secure.component';
import {RouterModule} from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderCreateComponent } from './orders/order-create/order-create.component';
import { OrderEditComponent } from './orders/order-edit/order-edit.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { MatCardModule } from '@angular/material/card';
import { BoxEditComponent } from './boxs/box-edit/box-edit.component';
import { BoxCreateComponent } from './boxs/box-create/box-create.component';
import { BoxsComponent } from './boxs/boxs.component';
import { PartnersComponent } from './partners/partners.component';
import { PartnerCreateComponent } from './partners/partner-create/partner-create.component';
import { PartnerEditComponent } from './partners/partner-edit/partner-edit.component';
import { PartnerDetailsComponent } from './partners/partner-details/partner-details.component';




@NgModule({
  declarations: [
    SecureComponent,
    NavComponent,
    MenuComponent,
    ProfileComponent,
    UsersComponent,
    UserCreateComponent,
    UserEditComponent,
    OrdersComponent,
    OrderCreateComponent,
    OrderEditComponent,
    OrderDetailsComponent,
    BoxsComponent,
    BoxCreateComponent,
    BoxEditComponent,
    PartnersComponent,
    PartnerCreateComponent,
    PartnerEditComponent,
    PartnerDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatExpansionModule,
    FormsModule,
    MatCardModule,

  ],
  providers: [DatePipe],
})
export class SecureModule { }
