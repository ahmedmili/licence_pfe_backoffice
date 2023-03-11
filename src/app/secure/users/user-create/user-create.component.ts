import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  form!:FormGroup;
  constructor(private formBuilder:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:'',
      email:'',
      phone:'',
      status:'',
      password:'',
    });
  }
  submit(): void {
    this.userService.create(this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/users']));
  }

}
