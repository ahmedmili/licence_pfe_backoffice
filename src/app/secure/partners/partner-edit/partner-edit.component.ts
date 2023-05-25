import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { SnackbarService } from 'src/app//services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.css']
})
export class PartnerEditComponent implements OnInit {
  form!: FormGroup;
  Imageform!: FormGroup;
  Passwordform!: FormGroup;
  id!: number;
  files: any;
  formData = new FormData();
  responseMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private partnerService: PartnerService,
    private router: Router,
    private route: ActivatedRoute,
    private sneackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {

    //info form
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      description: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      phone: ["", [Validators.required, Validators.pattern(GlobalConstants.contactRegex)]],

      category: ["", [Validators.required]],
      openingtime: ["", [Validators.required]],
      closingtime: ["", [Validators.required]]
    });

    //Password form
    this.Imageform = this.formBuilder.group({
      image: ["null", [Validators.required]],
    });
    
    this.Passwordform = this.formBuilder.group({
      password: ["", [Validators.required]],      
    });

    this.id = this.route.snapshot.params['id'];

    this.partnerService.get(this.id).subscribe(
      partner => {
        this.form.patchValue(partner);
        // console.log(partner);
      }
    );
  }

  uploadImage(event: any) {
    this.files = event.target.files[0];
  }

  submit(): void {
    const formValue = this.form.getRawValue();
    this.formData.append("name", formValue.name);
    this.formData.append("description", formValue.description);
    this.formData.append("email", formValue.email);
    this.formData.append("phone", formValue.phone);
    // this.formData.append("password", formValue.password);
    this.formData.append("category", formValue.category);
    this.formData.append("openingtime", formValue.openingtime);
    this.formData.append("closingtime", formValue.closingtime);
    // this.formData.append("image", this.files, this.files.name);
    // console.log(formValue);
    this.partnerService.update(this.id, this.formData)
      .subscribe((response) => {
        if (response.status == 200) {
          console.log(response);
          this.responseMessage = response.message;
          this.router.navigate(['/partners']);
        } else if (response.status == 400) {
          if (response.errors.name) {
            this.responseMessage = response.errors.name;
          } else if (response.errors.description) {
            this.responseMessage = response.errors.description;
          } else if (response.errors.email) {
            this.responseMessage = response.errors.email;
          } else if (response.errors.phone) {
            this.responseMessage = response.errors.phone;
          } 
          // else if (response.errors.password) {
          //   this.responseMessage = response.errors.password;
          // }
           else if (response.errors.category) {
            this.responseMessage = response.errors.category;
          }
          //  else if (response.errors.image) {
          //   this.responseMessage = response.errors.image;
          // }
        }else if(response.status == 500){
          this.responseMessage = GlobalConstants.genericError;
        }
        // console.log(response.errors.name);
        this.sneackbarService.openSnackBar(this.responseMessage, GlobalConstants.err)
      }
      );
  }
  
  
    changeImage(): void {
      const formValue = this.Imageform.getRawValue();

      // this.formData.append("password", formValue.password);
      this.formData.append("image", this.files, this.files.name);
      console.log(formValue);
      this.partnerService.updateImage(this.id, this.formData)
        .subscribe((response) => {
          if (response.status == 200) {
            console.log(response);
            this.responseMessage = response.message;
            this.router.navigate(['/partners']);
          } else if (response.status == 400) {
            
            // else if (response.errors.password) {
            //   this.responseMessage = response.errors.password;
            // }
            if (response.errors.image) {
              this.responseMessage = response.errors.image;
            }
          }else if(response.status == 500){
            this.responseMessage = GlobalConstants.genericError;
          }
          this.sneackbarService.openSnackBar(this.responseMessage, GlobalConstants.err)
        }
        );
    }
    
    changePassword(): void {
      const formValue = this.Passwordform.getRawValue();
      this.formData.append("password", formValue.password);
      console.log(formValue);
      this.partnerService.updatePassword(this.id, this.formData)
        .subscribe((response) => {
          if (response.status == 200) {
            console.log(response);
            this.responseMessage = response.message;
            this.router.navigate(['/partners']);
          } else if (response.status == 400) {
            
             if (response.errors.password) {
              this.responseMessage = response.errors.password;
            }
        
          }else if(response.status == 500){
            this.responseMessage = GlobalConstants.genericError;
          }
          this.sneackbarService.openSnackBar(this.responseMessage, GlobalConstants.err)
        }
        );
    }
  }
