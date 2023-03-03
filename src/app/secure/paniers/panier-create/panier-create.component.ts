import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier-create',
  templateUrl: './panier-create.component.html',
  styleUrls: ['./panier-create.component.css']
})
export class PanierCreateComponent implements OnInit {
  form!:FormGroup;
  constructor(private formBuilder:FormBuilder,private panierService:PanierService,private router:Router) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      title:'',
      description:'',
      ancien_prix:'',
      nouveau_prix:'',
      date_dispo:'',
      quantite:'',
      image:'',
      categorie:'',
    });
  }

  submit():void{
    const formValue = this.form.getRawValue();
  formValue.date_dispo = formatDate(formValue.date_dispo, 'yyyy-MM-dd', 'en-US');
  this.panierService.create(formValue)
    .subscribe(() => this.router.navigate(['/paniers']));
  }

}
