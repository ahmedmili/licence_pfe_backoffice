import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './../public.component.css']
})
export class RegisterComponent implements OnInit {
  form!:FormGroup;
  // name = '';
  // email = '';
  // password = '';

  constructor( private formBuilder:FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name :'',
      email :'',
      phone:'',
      password :'',
    });
  }

  submit(): void {

    this.authService.register(this.form.getRawValue())
    .subscribe(()=>this.router.navigate(['/login']));
  }


}
