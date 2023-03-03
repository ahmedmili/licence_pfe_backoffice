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
  data!:any;
  id!: number;
  user!: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      console.log(this.route.snapshot.params['id']);
      this.id = this.route.snapshot.params['id'];
      this.getData();
    }
  getData(){
    this.userService.getuserById(this.id).subscribe(
      res => {
        this.data = res;
        this.user = this.data;
      }
    )
  }
    submit(): void {
      this.userService.update(this.id, this.user)
        .subscribe(() => this.router.navigate(['/users']));
    }

}
