import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getEmployeCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/employe/count`);
  }
  getAdminCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/admin/count`);
  }

  getPendingCount(): Observable<{count:number}>{
    return this.http.get<{ count:number }>(`${this.apiUrl}/stats/pending-leaves-current-month`);
  }

  getAverageLeaveDays(): Observable<{count:number}>{
    return this.http.get<{ count:number }>(`${this.apiUrl}/stats/average-leave-days`);
  }

  getLeaveTypePercentages(): Observable<{ type: string, percentage: number }[]> {
    return this.http.get<{ type: string, percentage: number }[]>(`${this.apiUrl}/conges/statistics/leave-percentages`);
  }

  getAcceptedLeavesByMonth(year: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/stats/accepted-leaves-by-month/${year}`);
  }

  getRefusedLeavesByMonth(year: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/stats/refused-leaves-by-month/${year}`);
  }

  getAcceptedLeavesCurrentMonth(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/stats/accepted-leaves-current-month`);
  }

  getRefusedLeavesCurrentMonth(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/stats/refused-leaves-current-month`);
  }

  getPendingLeavesCurrentMonth(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/stats/pending-leaves-current-month`);
  }

  // getMostRequestedPeriods(): Observable<PeriodData[]> {
  //   return this.http.get<PeriodData[]>(`${this.apiUrl}/stats/most-requested-periods`);
  // }
}
