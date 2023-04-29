import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Partner } from 'src/app/interfaces/partner';
import { PartnerService } from 'src/app/services/partner.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit, AfterViewInit {

  partners: Partner[] = [];
  imageDirectoryPath = "http://localhost:8000/storage/partner_imgs/";
  columns = ['id', 'name', 'description', 'email', 'phone', 'image', 'category', 'openingtime', 'closingtime','status', 'actions', 'show details'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  search: string = '';
  category!: string;
  loaded = false;
  status!: string;
  constructor(
    private partnerService: PartnerService,
     private router: Router,
     private snackbarService: SnackbarService,
     ) { }

  ngOnInit(): void {
    this.partnerService.all().subscribe(
      partners => {
        this.dataSource.data = partners;
        this.loaded = true;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  toggleStatus(partner: Partner) {
    // if (partner.status === 'ACTIVE') {
    //   partner.status = 'INACTIVE';
    // } 
    // else if (partner.status === 'INACTIVE') {
    //   partner.status = 'ACTIVE';
    // } else if (partner.status === 'PENDING') {
    //   partner.status = 'ACTIVE';
    // }
    this.partnerService.updatePartnerStatus(partner.id, partner.status).subscribe(
      partner => {
        console.log('Partner status updated successfully');
      }
    );
  }




  getCategoryInputValue(category: any) {
    this.category = category;
    this.SearchPartner();
  }


  SearchPartner() {
    this.partnerService.getPartners(this.search, this.category).subscribe(partners => {
      this.dataSource.data = partners;
      console.log(partners);
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure ?')) {
      this.partnerService.delete(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((u: any) => u.id !== id);
        this.snackbarService.openSnackBar("Id: "+id+ " Deleted With Success","Success");
      });
    }
  }


}
