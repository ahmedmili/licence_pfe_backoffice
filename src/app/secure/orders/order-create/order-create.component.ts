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
      user_id:'',
      box_id:'',
      quantity:'',
      status:'',
    });
  }

  


  submit(): void {
    this.orderService.create(this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/orders']));
  }
  

}
