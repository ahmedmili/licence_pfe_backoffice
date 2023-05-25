import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  

  partnersCount: number = 0;
  usersCount: number = 0;
  boxesCount: number = 0;
  ordersCount: number = 0;
  orderpendingCount: number = 0;
  ordercancelCount: number = 0;
  ordersuccessCount: number = 0;

  constructor(private statService: StatService,private router: Router) { }
  redirectToPartners() {
    this.router.navigate(['/partners']);
  }
  redirectToUsers() {
    this.router.navigate(['/users']);
  }
  redirectToBoxes() {
    this.router.navigate(['/boxs']);
  }
  redirectToOrders() {
    this.router.navigate(['/orders']);
  }

  
  ngOnInit(): void {
    this.statService.totalPartners().subscribe(
      (response) => {
        this.partnersCount = response.partners_count;
      },
      (error) => {
        console.log(error);
      }
    );
    this.statService.totalUsers().subscribe(
      (response) => {
        this.usersCount = response.users_count;
      },
      (error) => {
        console.log(error);
      }
    );

    this.statService.totalOrders().subscribe(
      (response) => {
        this.ordersCount = response.commands_count;
      },
      (error) => {
        console.log(error);
      }
    );

    this.statService.totalBoxes().subscribe(
      (response) => {
        this.boxesCount = response.boxes_count;
      },
      (error) => {
        console.log(error);
      }
    );

    this.statService.getTotalCounts().subscribe(
      (response) => {
        this.orderpendingCount= response.pending_count;
        this.ordersuccessCount= response.success_count;
        this.ordercancelCount= response.cancel_count;
      },
      (error) => {
        console.log(error);
      }
    );
   
    
  }
}