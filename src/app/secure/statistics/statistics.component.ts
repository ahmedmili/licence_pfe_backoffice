import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { StatService } from 'src/app/services/stat.service';
import Chart from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { BarController } from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChartCanvas') doughnutChartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  barChart!: Chart;
  doughnutChart!: Chart;
  partnersCount: number = 0;
  usersCount: number = 0;
  boxesCount: number = 0;
  ordersCount: number = 0;
  orderpendingCount: number = 0;
  ordercancelCount: number = 0;
  ordersuccessCount: number = 0;
  boxpendingCount: number = 0;
  boxacceptedCount: number = 0;
  boxrejectedCount: number = 0;
  boxfinishedCount: number = 0;
  boxexpiredCount: number = 0;
  useractiveCount: number = 0;
  userinactiveCount: number = 0;
  constructor(private statService: StatService, private router: Router) { }

  redirectToPartners() {
    this.router.navigate(['/partners']);
  }

  redirectToUsers() {
    this.router.navigate(['/users']);
  }

  redirectToBoxes() {
    this.router.navigate(['/boxs']);
  }

  redirectToOrders() {
    this.router.navigate(['/orders']);
  }

  ngAfterViewInit() {
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Pending', 'Success', 'Cancel'],
          datasets: [{
            label: 'Orders Status',
            data: [
              this.orderpendingCount,
              this.ordersuccessCount,
              this.ordercancelCount,
            ],
          }]
        }
      });
    }
    const barCanvas = this.barChartCanvas.nativeElement;
  const barCtx = barCanvas.getContext('2d');
  if (barCtx) {
    this.barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['PENDING', 'ACCEPTED', 'REJECTED','FINISHED','EXPIRED'],
        datasets: [{
          label: 'Boxes Status',
          data: [
            this.boxpendingCount,
            this.boxacceptedCount,
            this.boxrejectedCount,
            this.boxfinishedCount,
            this.boxexpiredCount,
          ],
        }]
      }
    });
  }
  const doughnutCanvas = this.doughnutChartCanvas.nativeElement;
  const doughnutCtx = doughnutCanvas.getContext('2d');
  if (doughnutCtx) {
    this.doughnutChart = new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['ACTIVE', 'INACTIVE'],
        datasets: [{
          label: 'Users Status',
          data: [
            this.useractiveCount,
            this.userinactiveCount,
          ],
        }]
      }
    });
  }
}

  ngOnInit(): void {
    forkJoin([
      this.statService.totalPartners(),
      this.statService.totalUsers(),
      this.statService.totalOrders(),
      this.statService.totalBoxes(),
      this.statService.getTotalCounts(),
      this.statService.getTotalBoxCounts(),
      this.statService.getTotalUserCounts()
    ]).subscribe(
      ([partnersResponse, usersResponse, ordersResponse, boxesResponse, countsResponse,boxcountsResponse,usercountsResponse]) => {
        this.partnersCount = partnersResponse.partners_count;
        this.usersCount = usersResponse.users_count;
        this.ordersCount = ordersResponse.commands_count;
        this.boxesCount = boxesResponse.boxes_count;
        this.orderpendingCount = countsResponse.pending_count;
        this.ordersuccessCount = countsResponse.success_count;
        this.ordercancelCount = countsResponse.cancel_count;
        this.boxpendingCount = boxcountsResponse.pending_count;
        this.boxacceptedCount = boxcountsResponse.accepted_count;
        this.boxrejectedCount = boxcountsResponse.rejected_count;
        this.boxfinishedCount = boxcountsResponse.finished_count;
        this.boxexpiredCount = boxcountsResponse.expired_count;
        this.useractiveCount = usercountsResponse.active_count;
        this.userinactiveCount = usercountsResponse.inactive_count;
        this.updateChartData();
        this.updatebarChartData();
        this.updatedoughnutChartData();
      },
      (error) => {
        console.log(error);
        this.updateChartData();
        this.updatebarChartData();
        this.updatedoughnutChartData();
      }
    );
  }

  updateChartData() {
    if (this.chart && this.chart.data && this.chart.data.datasets && this.chart.data.datasets.length > 0) {
      this.chart.data.datasets[0].data = [
        this.orderpendingCount,
        this.ordersuccessCount,
        this.ordercancelCount,
      ];
      this.chart.update();
    }
  }
  updatebarChartData() {
    if (this.barChart && this.barChart.data && this.barChart.data.datasets && this.barChart.data.datasets.length > 0) {
      this.barChart.data.datasets[0].data = [
        this.boxpendingCount,
        this.boxacceptedCount,
        this.boxrejectedCount,
        this.boxfinishedCount,
        this.boxexpiredCount,
      ]; 
      this.barChart.update();
    }
  }

  updatedoughnutChartData() {
    if (this.doughnutChart && this.doughnutChart.data && this.doughnutChart.data.datasets && this.doughnutChart.data.datasets.length > 0) {
      this.doughnutChart.data.datasets[0].data = [
        this.useractiveCount,
        this.userinactiveCount,
       
      ]; 
      this.doughnutChart.update();
    }
  }
  
}
