import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Partner } from 'src/app/interfaces/partner';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  partners:Partner[]=[];
  columns = ['id','name', 'description', 'email', 'phone', 'image', 'category', 'openingtime', 'closingtime','actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private partnerService:PartnerService, private router:Router) { }

  ngOnInit(): void {
    this.partnerService.all().subscribe(
partners=>{
  this.dataSource.data=partners;
}
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; 
}

delete(id: number): void{
  if(confirm('Are you sure ?')){
    this.partnerService.delete(id).subscribe(() => {
      const newData: Partner[] = [];
      this.dataSource.data.forEach((p: unknown) => {
        if ((p as Partner).id !== id) {
          let updatedData: Partner[] = [];
          updatedData.push(p as Partner);
        }
      });
      this.dataSource.data = newData;
      this.router.navigate(['/partners']);
    });
  }
}


}
