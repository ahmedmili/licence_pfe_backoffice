import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
  constructor(private formBuilder:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:["", [Validators.required]],
      email:["", [Validators.required]],
      phone:["", [Validators.required]],
      password:["", [Validators.required]],
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
      this.router.navigate(['/users']);
      console.log(response);
    }
      );

  }

}
