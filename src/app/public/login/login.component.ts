
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { GlobalConstants } from '../../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./../public.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  responseMessage!:string;
  constructor( private formBuilder:FormBuilder,
    private sneackbarService: SnackbarService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null,[Validators.required]],
    });
  }

  submit(): void {
    this.authService.login(this.form.getRawValue())
      .subscribe((response:any) => {
        if(response.body.status == 400){
          response.body[0].email ? this.responseMessage = response.body[0].email : this.responseMessage = response.body[0].passworde;       
        }else if(response.body.status == 200){
          localStorage.setItem('token',response.body!.token!);
          this.router.navigate(['/']);
        }else if(response.body.status == 401){
 
          this.responseMessage = response.body.message;
        }
        this.sneackbarService.openSnackBar(this.responseMessage,GlobalConstants.err)
      }
      ,(error:any)=>{
        if(error.status == 400){
          
        }else{
          this.responseMessage = GlobalConstants.genericError;
        }
        this.sneackbarService.openSnackBar(this.responseMessage,GlobalConstants.err)
      }
      );


}}
