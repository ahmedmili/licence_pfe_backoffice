import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Box } from 'src/app/interfaces/Box';
import { BoxService } from 'src/app/services/box.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-boxs',
  templateUrl: './boxs.component.html',
  styleUrls: ['./boxs.component.css']
})
export class BoxsComponent implements OnInit {
  columns = ['ID','title', 'description','oldprice','newprice','startdate','enddate','quantity','remaining_quantity','image','category','status','actions'];
  dataSource = new MatTableDataSource();
  paniers: Box[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private boxService:BoxService, private router:Router,private route: ActivatedRoute,) { }
  ngOnInit(): void {
    // this.loadPaniers();
    this.boxService.all().subscribe(
      boxs=>
      this.dataSource.data=boxs
    );
   
  }
  
  // loadPaniers() {
  //   this.boxService.all().subscribe((data: Panier[]) => {
  //     this.paniers = data;
  //     this.dataSource2 = new MatTableDataSource<Panier>(this.paniers);
  //   });
  // }

  // onSearch(searchValue: string) {
  //   this.boxService.searchPaniers(searchValue).subscribe((data: Panier[]) => {
  //     this.paniers = data;
  //     this.dataSource2 = new MatTableDataSource<Panier>(this.paniers);
  //   });
  // }
 
  

  delete(id: number): void{
    if(confirm('Are you sure ?')){
      this.boxService.delete(id).subscribe(() => {
        const newData: Box[] = [];
        this.dataSource.data.forEach((p: unknown) => {
          if ((p as Box).id !== id) {
            let updatedData: Box[] = [];
            updatedData.push(p as Box);
          }
        });
        this.dataSource.data = newData;
        this.router.navigate(['/boxs']);
      });

      
    }
  }

}