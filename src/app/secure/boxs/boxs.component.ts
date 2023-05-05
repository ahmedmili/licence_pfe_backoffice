import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Box } from 'src/app/interfaces/Box';
import { MatPaginator } from '@angular/material/paginator';
import { BoxService } from 'src/app/services/box.service';
import { SnackbarService } from 'src/app/services/snackbar.service';



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
  status!: string;
  constructor(
    private boxService: BoxService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,

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


getStatusInputValueBox(status:any){
  this.status = status;
  this.SearchBox();
}


SearchBox() {
  this.boxService.getBoxs(this.search,this.status).subscribe(boxs => {
      this.dataSource.data = boxs; 
  });
}

toggleStatus(box: Box) {
  this.boxService.updateBoxStatus(box.id,box.status).subscribe(
    box => {
      console.log('Box status updated successfully');
    }
  );
}

  delete(id: number): void {
    if (confirm('Are you sure ?')) {
      this.boxService.delete(id).subscribe(() => {
      
        this.dataSource.data = this.dataSource.data.filter((u:any) => u.id !== id);
        this.snackbarService.openSnackBar("id"+id+"deleted with success","");
      });


    }
  }


}