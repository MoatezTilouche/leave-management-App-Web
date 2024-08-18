import { Component } from '@angular/core';
import { StatsService } from '../stats.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent {
  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadLeaveTypePercentages();
    Chart.register(...registerables); // Enregistrer tous les composants nécessaires
  }

  loadLeaveTypePercentages() {
    this.statsService.getLeaveTypePercentages().subscribe(
      (data) => {
        const labels = data.map(item => item.type);
        const percentages = data.map(item => item.percentage);

        this.createChart(labels, percentages);
      },
      (error) => {
        console.error('Failed to load leave type percentages', error);
      }
    );
  }

  createChart(labels: string[], data: number[]) {
    new Chart('leaveTypeChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)', // Couleur 1
            'rgba(54, 162, 235, 0.2)', // Couleur 2
            'rgba(75, 192, 192, 0.2)', // Couleur 4
            'rgba(153, 102, 255, 0.2)', // Couleur 5
            'rgba(255, 159, 64, 0.2)', // Couleur 6
            'rgba(199, 199, 199, 0.2)', // Couleur 7
            'rgba(255, 99, 71, 0.2)', // Couleur 8
            'rgba(144, 238, 144, 0.2)' // Couleur 9
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)', // Couleur 1
            'rgba(54, 162, 235, 1)', // Couleur 2
            'rgba(75, 192, 192, 1)', // Couleur 4
            'rgba(153, 102, 255, 1)', // Couleur 5
            'rgba(255, 159, 64, 1)', // Couleur 6
            'rgba(199, 199, 199, 1)', // Couleur 7
            'rgba(255, 99, 71, 1)', // Couleur 8
            'rgba(144, 238, 144, 1)' // Couleur 9
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Leave Types'
          }
        }
      }
    });
  }
}

