import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id!: number;
  orders: any[] = [];
  constructor(private userService:UserService,
    public datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.userService.getdetails(this.id).subscribe(
        
        data => {
          console.log(data.boxs)
          this.orders = data;
        },
        error => {
        console.log(error);
        }
        );
  }



}
