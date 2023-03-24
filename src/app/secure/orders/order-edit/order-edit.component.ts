import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  constructor(private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackbarService
    ) { }

    ngOnInit(): void {
      this.form=this.formBuilder.group({
        status:'',
      });

      this.id = this.route.snapshot.params['id'];

      this.orderService.get(this.id).subscribe(
        order => this.form.patchValue(order)
      );
    }

    submit(): void {
      this.orderService.update(this.id, this.form.getRawValue())
        .subscribe(() => {
          this.router.navigate(['/orders'])
        this.snackBarService.openSnackBar("updated with success","success");
        });
    }
}
