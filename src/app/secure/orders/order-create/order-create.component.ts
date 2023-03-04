import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  form!:FormGroup;
  constructor(private formBuilder:FormBuilder,private orderService:OrderService,private router:Router) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      date_cmd:'',
      heure_cmd:'',
      user_id:'',
      total_prix:'',
      statut:'',
    });
  }

  submit(): void {
    const formValue = this.form.getRawValue();
    formValue.date_cmd = formatDate(formValue.date_cmd, 'yyyy-MM-dd', 'en-US');
    formValue.heure_cmd = formValue.heure_cmd + ':00'; // ajout des secondes à l'heure saisie
    this.orderService.create(formValue)
      .subscribe(() => this.router.navigate(['/orders']));
  }
  

}
