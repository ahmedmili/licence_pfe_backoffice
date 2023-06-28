import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  form!: FormGroup;
  passwordform!: FormGroup;
  id!: number;
  responseMessage!: string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    //info validator
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: ["", [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      phone: ["", [Validators.required, Validators.pattern(GlobalConstants.contactRegex)]],
      birthday: ["", [Validators.required]],
      sexe: ["", [Validators.required]],
    });
    //password validator
    this.passwordform = this.formBuilder.group({
      password: ["", [Validators.required,Validators.minLength],]
    });

    this.id = this.route.snapshot.params['id'];

    this.userService.get(this.id).subscribe(
      user => this.form.patchValue(user)
    );
  }

  submit(): void {
    try {
      this.userService.update(this.id, this.form.getRawValue())
        .subscribe((response) => {
          console.log(response)
          if (response.status == 200) {
            this.router.navigate(['/users']);
            this.snackbarService.openSnackBar("Edit with Success", "Sucess");
          } else if (response.status == 400) {
            if (response[0].name) {
              this.responseMessage = response[0].name;
            } else if (response[0].email) {
              this.responseMessage = response[0].email;
            } else if (response[0].phone) {
              this.responseMessage = response[0].phone;
            }
            else if (response[0].birthday) {
              this.responseMessage = response[0].birthday;
            }
            else if (response[0].sexe) {
              this.responseMessage = response[0].sexe;
            }
            console.log(response[0])
            this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.err);
          } else if (response.status == 500) {
            this.snackbarService.openSnackBar(GlobalConstants.genericError, GlobalConstants.err);
          }else if (response.status == 404) {
            this.snackbarService.openSnackBar(response.message, GlobalConstants.err);
          }
        }
        );
    } catch (error) {
      console.log(error)
    }
  }
  
  submitPassword(): void {
    try {
      this.userService.updatePassword(this.id, this.passwordform.getRawValue())
        .subscribe((response) => {
          console.log(response.status)
          if (response.status == 200) {
            this.router.navigate(['/users']);
            this.snackbarService.openSnackBar("Edit with Success", "Sucess");
          } else if (response.status == 400) {
            if (response[0].password) {
              this.responseMessage = response[0].password;
            } 
            this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.err);
          } else if (response.status == 500) {
            this.snackbarService.openSnackBar(GlobalConstants.genericError, GlobalConstants.err);
          }else if (response.status == 404) {
            this.snackbarService.openSnackBar(response.message, GlobalConstants.err);
          }
        }
        );
    } catch (error) {
      console.log(error)
    }
  }

}
