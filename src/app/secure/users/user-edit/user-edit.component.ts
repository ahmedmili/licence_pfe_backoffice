import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.form=this.formBuilder.group({
        name:'',
        email:'',
        phone:'',
      });

      this.id = this.route.snapshot.params['id'];

      this.userService.get(this.id).subscribe(
        user => this.form.patchValue(user)
      );
    }
 
    submit(): void {
      this.userService.update(this.id, this.form.getRawValue())
        .subscribe(() => this.router.navigate(['/users']));
    }

}
