import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  form!: FormGroup;
  responseMessage!: string;
  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user_id: ['', [Validators.required]],
      box_id: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }
  submit(): void {
    this.orderService.create(this.form.getRawValue())
      .subscribe((response) => {
        if (response.status == 200) {
          this.router.navigate(['/orders']);
          console.log(response);
          this.responseMessage = response.message;
        } else if (response.status == 400) {
          if (response.message.box_id)
            this.responseMessage = response.message.box_id;
          else if (response.message.quantity)
            this.responseMessage = response.message.quantity;
          else if (response.message.status)
            this.responseMessage = response.message.status;
          else if (response.message.user_id)
            this.responseMessage = response.message.user_id;
          else this.responseMessage = GlobalConstants.genericError;
          console.log(response);
        }
        this.snackbarService.openSnackBar(this.responseMessage, "error");
      }

      )
  }

}



