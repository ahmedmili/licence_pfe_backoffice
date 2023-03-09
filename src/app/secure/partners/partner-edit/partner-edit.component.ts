import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(
    private formBuilder: FormBuilder,
    private partnerService: PartnerService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.form=this.formBuilder.group({
        name:'',
        description:'',
        email:'',
        phone:'',
        password:'',
        image:'',
        category:'',
        openingtime:'', 
        closingtime:''
      });

      this.id = this.route.snapshot.params['id'];

      this.partnerService.get(this.id).subscribe(
        partner => this.form.patchValue(partner)
      );
    }
 
    submit(): void {
      this.partnerService.update(this.id, this.form.getRawValue())
        .subscribe(() => this.router.navigate(['/partners']));
    }

}
