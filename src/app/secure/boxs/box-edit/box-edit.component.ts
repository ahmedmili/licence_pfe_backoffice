import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxService } from 'src/app/services/box.service';
import { SnackbarService } from 'src/app//services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-box-edit',
  templateUrl: './box-edit.component.html',
  styleUrls: ['./box-edit.component.css']
})
export class BoxEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  files: any;
  formData = new FormData();
  responseMessage!: string;
  constructor(private formBuilder: FormBuilder,
    private boxService: BoxService,
    private router: Router,
    private route: ActivatedRoute,
    private sneackbarService: SnackbarService,
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
      // image: ["", [Validators.required]],
      category: ["", [Validators.required]],
      status: ["", [Validators.required]],
      partner_id: ["", [Validators.required]]
      // description: ["", [Validators.required]],
    });

    this.id = this.route.snapshot.params['id'];
    // console.log(this.id)
    this.boxService.get(this.id).subscribe(
      box =>{
         this.form.patchValue(box['box'][0])
        //  this.form.patchValue({
        //   title: box.title
        //  })
         console.log(box['box'][0])
        }
    );
  }
  uploadImage(event: any) {
    this.files = event.target.files[0];
  }
  submit(): void {
    const formValue = this.form.getRawValue();
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

    // this.formData.append("image", this.files, this.files.name);

    this.boxService.update(this.id, this.formData)
      .subscribe((response) => {
        if (response.status == 200) {
          console.log(response);
          this.responseMessage = response.message;
          this.router.navigate(['/boxs']);
        } else if (response.status == 400) {
          if (response.errors.title) {
            this.responseMessage = response.errors.title;
          } else if (response.errors.description) {
            this.responseMessage = response.errors.description;
          } else if (response.errors.oldprice) {
            this.responseMessage = response.errors.oldprice;
          } else if (response.errors.newprice) {
            this.responseMessage = response.errors.newprice;
          } else if (response.errors.startdate) {
            this.responseMessage = response.errors.startdate;
          } else if (response.errors.enddate) {
            this.responseMessage = response.errors.enddate;
          } else if (response.errors.quantity) {
            this.responseMessage = response.errors.quantity;
          } else if (response.errors.category) {
            this.responseMessage = response.errors.category;
          } else if (response.errors.status) {
            this.responseMessage = response.errors.status;
          } else if (response.errors.partner_id) {
            this.responseMessage = response.errors.partner_id;
          }else if (response.errors.image) {
            this.responseMessage = response.errors.image;
          }
        } else if (response.status == 500) {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.sneackbarService.openSnackBar(this.responseMessage, GlobalConstants.err)
      }
      );
  }
}
