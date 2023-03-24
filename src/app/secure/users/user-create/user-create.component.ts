import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  form!:FormGroup;
  files: any;
  responseMessage!: string;
  formData = new FormData();
  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private router:Router,
    private snackbarService:SnackbarService,
    ) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:["", [Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:["", [Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      phone:["", [Validators.required,Validators.pattern(GlobalConstants.contactRegex)]],
      password:["", [Validators.required,Validators.minLength(8)]],
      status:["", [Validators.required]],
    });
  }
  submit(): void {
    const formValue = this.form.getRawValue();
    this.formData.append("name", formValue.name);
    this.formData.append("email", formValue.email);
    this.formData.append("phone", formValue.phone);
    this.formData.append("password", formValue.password);
    this.formData.append("status", formValue.status);
    this.formData.append("roleId", "2");

    this.userService.create(this.formData)
    .subscribe((response) => {
      if(response.status == 201){
        this.router.navigate(['/users']);
      }else if(response.status == 400){
        if (response[0].name) this.responseMessage = response[0].name
        else if (response[0].email) this.responseMessage = response[0].email
        else if (response[0].phone) this.responseMessage = response[0].phone
        else if (response[0].status) this.responseMessage = response[0].status
        else if (response[0].password) this.responseMessage = response[0].password
        else if (response[0].roleId) this.responseMessage = response[0].roleId
        this.snackbarService.openSnackBar(this.responseMessage,"error")
      }else this.snackbarService.openSnackBar(GlobalConstants.genericError,"error")

    }
      );

  }

}
