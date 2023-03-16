import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.css']
})
export class PartnerCreateComponent implements OnInit {
  form!:FormGroup;
  files: any;
  responseMessage!: string;
  formData = new FormData();
  constructor(private formBuilder:FormBuilder,private partnerService:PartnerService,private router:Router) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:["", [Validators.required]],
      description:["", [Validators.required]],
      email:["", [Validators.required]],
      phone:["", [Validators.required]],
      password:["", [Validators.required]],
      image:["", [Validators.required]],
      category:["", [Validators.required]],
      openingtime:["", [Validators.required]], 
      closingtime:["", [Validators.required]]
    });
  }

  uploadImage(event: any) {
    this.files = event.target.files[0];
    console.log(this.files);
  }

  submit(): void {
    const formValue = this.form.getRawValue();
    this.formData.append("name", formValue.name);
    this.formData.append("description", formValue.description);
    this.formData.append("email", formValue.email);
    this.formData.append("phone", formValue.phone);
    this.formData.append("password", formValue.password);
    this.formData.append("category", formValue.category);
    this.formData.append("openingtime", formValue.openingtime);
    this.formData.append("closingtime", formValue.closingtime);
    this.formData.append("image", this.files, this.files.name);
    this.formData.append("roleId", "3");

    
    this.partnerService.create(this.formData)
      .subscribe((response) => {
        this.router.navigate(['/partners']);
        console.log(response);
      }
        );
  }


}
