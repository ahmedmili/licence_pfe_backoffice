import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  columns = ['id','created_at','status','price','actions','show details'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private orderService: OrderService, private router: Router, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.orderService.all().subscribe(
      orders => {
       
        this.dataSource.data = orders;
      }
    );
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


delete(id: number): void{
  if(confirm('Are you sure ?')){
    this.orderService.delete(id).subscribe(() => {
      const newData: Order[] = [];
      this.dataSource.data.forEach((p: unknown) => {
        if ((p as Order).id !== id) {
          let updatedData: Order[] = [];
          updatedData.push(p as Order);
        }
      });
      this.dataSource.data = newData;
      this.router.navigate(['/orders']);
    });

    
  }
}

}
