
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./../public.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor( private formBuilder:FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  submit(): void {
    this.authService.login(this.form.getRawValue())
      .subscribe((response) => {
        // afficher les cookies
        // console.log(response.body!.token!);
        localStorage.setItem('token',response.body!.token!);
        // rediriger l'utilisateur
        this.router.navigate(['/']);
      });


}}
