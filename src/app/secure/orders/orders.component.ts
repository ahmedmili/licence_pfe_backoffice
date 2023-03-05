import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  columns = ['ID','date_cmd', 'heure_cmd','total_prix','statut','actions','show details'];
  dataSource = new MatTableDataSource();
  constructor(private orderService:OrderService, private router:Router) { }

  ngOnInit(): void {
    this.orderService.all().subscribe(
        orders=> {
            this.dataSource.data = orders 
        },
       
    );
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
