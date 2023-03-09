import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.css']
})
export class PartnerCreateComponent implements OnInit {
  form!:FormGroup;
  constructor(private formBuilder:FormBuilder,private partnerService:PartnerService,private router:Router) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:'',
      description:'',
      email:'',
      phone:'',
      password:'',
      image:'',
      category:'',
      openingtime:'', 
      closingtime:''
    });
  }
  submit(): void {
    this.partnerService.create(this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/partners']));
  }


}
