import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Partner } from 'src/app/interfaces/partner';
import { BoxService } from 'src/app/services/box.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from '../../../services/snackbar.service';
import { DatePipe } from '@angular/common';

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
    // Add a custom validator for the end date
this.form.controls['enddate'].setValidators([Validators.required, (control: AbstractControl) => {
  const selectedEndDate: Date = new Date(control.value);
  const today: Date = new Date();

  // Set the time portion of both dates to 00:00:00 for comparison
  selectedEndDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (selectedEndDate.getTime() === today.getTime()) {
    return null;  // Valid date (end date is today)
  } else {
    return { endDateInvalid: true };  // Invalid date (end date is not today)
  }
}]);

  }
  uploadImage(event: any) {
    this.files = event.target.files[0];
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
