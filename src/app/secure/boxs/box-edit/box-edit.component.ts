import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxService } from 'src/app/services/box.service';

@Component({
  selector: 'app-box-edit',
  templateUrl: './box-edit.component.html',
  styleUrls: ['./box-edit.component.css']
})
export class BoxEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  constructor(  private formBuilder: FormBuilder,
    private boxService: BoxService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      title:'',
      description:'',
      oldprice:'',
      newprice:'',
      startdate:'',
      enddate:'',
      quantity:'',
      image:'',
      category:'',
      status:'',
    });

    this.id = this.route.snapshot.params['id'];

    this.boxService.get(this.id).subscribe(
      box => this.form.patchValue(box)
    );
  }

  submit(): void {
    this.boxService.update(this.id, this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/boxs']));
  }

}
