import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Box } from 'src/app/interfaces/Box';
import { Partner } from 'src/app/interfaces/partner';
import { BoxService } from 'src/app/services/box.service';


@Component({
  selector: 'app-box-details',
  templateUrl: './box-details.component.html',
  styleUrls: ['./box-details.component.css']
})
export class BoxDetailsComponent implements OnInit {
  imageDirectoryPath = "http://localhost:8000/storage/partner_imgs/";

  id!: number;
  box!: any;
  partner!: Partner;
  constructor(private boxService:BoxService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.boxService.getdetails(this.id).subscribe(
        data => {

          this.box = data;
          console.log(data)
         
        },
       
      );
    } 
}