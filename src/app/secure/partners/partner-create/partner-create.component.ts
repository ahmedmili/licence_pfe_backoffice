import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.css']
})
export class PartnerCreateComponent implements OnInit {
  form!: FormGroup;
  files: any;
  responseMessage!: string;
  formData = new FormData();
  constructor(
    private formBuilder: FormBuilder,
    private partnerService: PartnerService,
    private router: Router,
    private snackbarService: SnackbarService,

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      email: ["", [Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      phone: ["", [Validators.required,Validators.pattern(GlobalConstants.contactRegex)]],
      password: ["", [Validators.required]],
      image: ["", [Validators.required]],
      category: ["", [Validators.required]],
      openingtime: ["", [Validators.required]],
      closingtime: ["", [Validators.required]]
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
        if (response.status == 201) {
          this.router.navigate(['/partners']);
          this.snackbarService.openSnackBar("Partner Created Successfully", "Sucess");          
        } else if (response.status == 400) {
          console.log(response[0].name);
          if (response[0].name) this.responseMessage = response[0].name
          else if (response[0].description) this.responseMessage = response[0].description
          else if (response[0].email) this.responseMessage = response[0].email
          else if (response[0].phone) this.responseMessage = response[0].phone
          else if (response[0].phone) this.responseMessage = response[0].password
          else if (response[0].category) this.responseMessage = response[0].category
          else if (response[0].openingtime) this.responseMessage = response[0].openingtime
          else if (response[0].closingtime) this.responseMessage = response[0].closingtime
          else if (response[0].image) this.responseMessage = response[0].image
          else if (response[0].roleId) this.responseMessage = response[0].roleId
          this.snackbarService.openSnackBar(this.responseMessage, "error");
        }
      }
      );
  }


}
