import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.css']
})
export class PartnerEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  files: any;
  formData = new FormData();
  constructor(
    private formBuilder: FormBuilder,
    private partnerService: PartnerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      password: ["", [Validators.required]],
      image: ["", [Validators.required]],
      category: ["", [Validators.required]],
      openingtime: ["", [Validators.required]],
      closingtime: ["", [Validators.required]]
    });

    this.id = this.route.snapshot.params['id'];

    this.partnerService.get(this.id).subscribe(
      partner =>{
        this.form.patchValue(partner);
        console.log(partner);
      } 
    );
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
    console.log(formValue);
    this.partnerService.update(this.id, this.formData)
      .subscribe((response) => {
        // if (response.status == 200)
        console.log(response);
        this.router.navigate(['/partners']);
      }
      );
  }

}
