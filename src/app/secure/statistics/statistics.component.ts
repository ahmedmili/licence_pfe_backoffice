import { Component, OnInit } from '@angular/core';
import { PartnerService } from 'src/app/services/partner.service';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  partnersCount: number = 0;

  constructor(private statService: StatService) { }

  ngOnInit(): void {
    this.statService.totalPartners().subscribe(
      (response) => {
        this.partnersCount = response.partners_count;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}