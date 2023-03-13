import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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

export class BoxsComponent implements OnInit, AfterViewInit {

  columns = ['ID','title', 'description','oldprice','newprice','startdate','enddate','quantity','remaining_quantity','image','category','status','actions','show details'];
  imageDirectoryPath = "http://localhost:8000/storage/boxs_imgs/";

  dataSource = new MatTableDataSource();
  boxs: Box[]| boolean = false;
  loaded = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  search: string = '';
  constructor(
    private boxService: BoxService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }



  ngOnInit(): void {
    // this.loadPaniers();
  
    this.boxService.all().subscribe(
      boxs =>{
        this.dataSource.data = boxs;
        this.loaded = true;
      }
        
    );

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; 
}


SearchBox() {
  this.boxService.getBoxs(this.search).subscribe(boxs => {
      this.dataSource.data = boxs; 
  });
}


  delete(id: number): void {
    if (confirm('Are you sure ?')) {
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