import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { BoxService} from 'src/app/services/box.service';

@Component({
  selector: 'app-box-create',
  templateUrl: './box-create.component.html',
  styleUrls: ['./box-create.component.css']
})
export class BoxCreateComponent implements OnInit {
  form!:FormGroup;
  constructor(private formBuilder:FormBuilder,private boxService:BoxService,private router:Router) { }

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
  }

  submit():void{
    const formValue = this.form.getRawValue();
    formValue.startdate = formatDate(formValue.startdate, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    formValue.enddate = formatDate(formValue.enddate, 'yyyy-MM-dd HH:mm:ss', 'en-US');
  this.boxService.create(formValue)
    .subscribe(() => this.router.navigate(['/boxs']));
  }

  

}
