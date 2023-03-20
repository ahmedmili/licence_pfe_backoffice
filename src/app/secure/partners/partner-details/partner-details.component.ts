import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Partner } from 'src/app/interfaces/partner';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent implements OnInit {
  imageDirectoryPath = "http://localhost:8000/storage/boxs_imgs/";

  id!: number;
  partner!: Partner;
  constructor(private partnerService:PartnerService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.partnerService.getdetails(this.id).subscribe(
        data => {
          this.partner = data;
        },
        error => {
        console.log(error);
        }
        );
  
  }}
