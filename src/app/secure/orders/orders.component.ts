import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
import { SnackbarService } from 'src/app/services/snackbar.service';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  columns = ['id', 'created_at', 'status', 'price', 'user_email', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loaded = false;
  search: string = '';
  status!: string;
  constructor(
    private orderService: OrderService,
    private router: Router,
    public datePipe: DatePipe,
    public snackBarServices: SnackbarService,


  ) { }

  ngOnInit(): void {
    this.orderService.all().subscribe(
      orders => {

        this.dataSource.data = orders;
        this.loaded = true;
      }
    );
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }



  getStatusInputValue(status: any) {
    this.status = status;
    this.SearchOrder();
  }

  SearchOrder() {
    this.orderService.getOrders(this.search, this.status).subscribe(orders => {
      this.dataSource.data = orders;
    });
  }

  toggleStatus(order: Order) {
    this.orderService.updateOrderStatus(order.id,order.status).subscribe(
      order=> {
        console.log('Order status updated successfully');
      }
    );
  }
  


  filterOrders(status: string): void {
    this.orderService.getFilteredOrders(status).subscribe(orders => {
      this.dataSource.data = orders;
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure ?')) {
      this.orderService.delete(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((u: any) => u.id !== id);
        this.snackBarServices.openSnackBar("deleted with success", "success");
      });


    }
  }

}
