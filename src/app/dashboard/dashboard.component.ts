import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employeCount = 0;
  pendingCount=0;
  averageDays=0;
  avergeDaysFormatted='0.0';
  isCollapsed = false;
  



  constructor(private statsService: StatsService,private router: Router) {}

  ngOnInit(): void {
    this.loadEmployeCount();
    this.loadPendingCount();
    this.loadAverageLeaveCount();
    

  }
  
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  loadEmployeCount() {
    this.statsService.getEmployeCount().subscribe(
      (response) => {
        this.employeCount = response.count;
        
      },
      (error) => {
        console.error('Failed to load employee count', error);
      }
    );
  }
  loadPendingCount(){
    this.statsService.getPendingCount().subscribe(
      (response) => {
        this.pendingCount = response.count;
        console.log(this.pendingCount);
      },
      (error) => {
        console.error('Failed to load Pending Leaves count', error);

      }
    );
  }
  loadAverageLeaveCount(){
     this.statsService.getAverageLeaveDays().subscribe(
      (response) => {
        this.averageDays=response.count;
       this.avergeDaysFormatted=this.averageDays.toFixed(2);
      },
      (error) => {
        console.error('Failed to load Pending Leaves count', error);
      }

     );
  }
  
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
