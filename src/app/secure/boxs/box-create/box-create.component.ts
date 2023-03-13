import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Partner } from 'src/app/interfaces/partner';
import { BoxService } from 'src/app/services/box.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-box-create',
  templateUrl: './box-create.component.html',
  styleUrls: ['./box-create.component.css']
})
export class BoxCreateComponent implements OnInit {
  form!: FormGroup;
  files: any;
  responseMessage!: string;
  formData = new FormData();

  constructor(
    private formBuilder: FormBuilder,
    private boxService: BoxService,
    private snackbar: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({

      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      oldprice: ["", [Validators.required]],
      newprice: ["", [Validators.required]],
      startdate: ["", [Validators.required]],
      enddate: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      image: ["", [Validators.required]],
      category: ["", [Validators.required]],
      status: ["", [Validators.required]],
      partner_id: ["", [Validators.required]]
    });
  }
  uploadImage(event: any) {
    this.files = event.target.files[0];
    console.log(this.files);
  }

  submit(): void {
    const formValue = this.form.getRawValue();

    formValue.startdate = formatDate(formValue.startdate, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    formValue.enddate = formatDate(formValue.enddate, 'yyyy-MM-dd HH:mm:ss', 'en-US');

    this.formData.append("title", formValue.title);
    this.formData.append("description", formValue.description);
    this.formData.append("oldprice", formValue.oldprice);
    this.formData.append("newprice", formValue.newprice);
    this.formData.append("startdate", formValue.startdate);
    this.formData.append("enddate", formValue.enddate);
    this.formData.append("quantity", formValue.quantity);
    this.formData.append("category", formValue.category);
    this.formData.append("status", formValue.status);
    this.formData.append("partner_id", formValue.partner_id);
    this.formData.append("image", this.files, this.files.name);
    console.log((this.formData.get('image')));
    this.boxService.create(this.formData)
      .subscribe(
        (response) => {
          if (response.status == 201) {
            this.router.navigate(['/boxs']);
            this.responseMessage = response.message
          } else if (response.status == 400) {
            this.responseMessage = response.error
          } else {
            console.log(response);
          }
          // this.router.navigate(['/boxs']);
          this.snackbar.openSnackBar(this.responseMessage, "error");
          console.log(response);
        }
      )

  }
}
