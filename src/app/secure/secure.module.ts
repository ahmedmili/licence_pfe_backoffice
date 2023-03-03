import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavComponent} from './nav/nav.component';
import {MenuComponent} from './menu/menu.component';
import {SecureComponent} from './secure.component';
import {RouterModule} from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { PaniersComponent } from './paniers/paniers.component';
import { PanierCreateComponent } from './paniers/panier-create/panier-create.component';


@NgModule({
  declarations: [
    SecureComponent,
    NavComponent,
    MenuComponent,
    ProfileComponent,
    UsersComponent,
    PaniersComponent,
    PanierCreateComponent
    
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
    MatExpansionModule

  ]
})
export class SecureModule { }
