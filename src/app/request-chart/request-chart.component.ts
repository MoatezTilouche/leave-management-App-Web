import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-request-chart',
  templateUrl: './request-chart.component.html',
  styleUrls: ['./request-chart.component.css']
})
export class RequestChartComponent implements OnInit, OnDestroy {
  acceptedLeavesByMonth: number[] = [];
  refusedLeavesByMonth: number[] = [];
  acceptedLeavesCurrentMonth: number | undefined;
  refusedLeavesCurrentMonth: number | undefined;
  pendingLeavesCurrentMonth: number | undefined;
  mostRequestedPeriods: string[] = [];
  private chart: Chart | undefined;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();

    this.statsService.getAcceptedLeavesByMonth(currentYear).subscribe(data => {
      this.acceptedLeavesByMonth = data;
      this.renderChart();
    });

    this.statsService.getRefusedLeavesByMonth(currentYear).subscribe(data => {
      this.refusedLeavesByMonth = data;
      this.renderChart();
    });

    this.statsService.getAcceptedLeavesCurrentMonth().subscribe(data => {
      this.acceptedLeavesCurrentMonth = data;
    });

    this.statsService.getRefusedLeavesCurrentMonth().subscribe(data => {
      this.refusedLeavesCurrentMonth = data;
    });

    this.statsService.getPendingCount().subscribe(
      (response) => {
        this.pendingLeavesCurrentMonth = response.count;
        console.log(this.pendingLeavesCurrentMonth);
      },
      (error) => {
        console.error('Failed to load Pending Leaves count', error);
      }
    );

 
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }

  renderChart(): void {
    const canvas = document.getElementById('column-chart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.destroyChart(); // Destroy the existing chart before creating a new one

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Accepted Leaves',
              data: this.acceptedLeavesByMonth,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Refused Leaves',
              data: this.refusedLeavesByMonth,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Unable to get context for chart rendering');
    }
  }
}
