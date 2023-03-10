import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  id!: number;
  order!: Order;
 
  constructor(private orderService:OrderService,
    private router: Router,
    private route: ActivatedRoute) { }

      

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.orderService.getdetails(this.id).subscribe(
      
      data => {
        console.log(data.boxs)
        this.order = data;
      },
      error => {
      console.log(error);
      }
      );

}}
