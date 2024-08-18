import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeService } from '../employe.service';
import { Employe } from '../models/employe';
import { Observable } from 'rxjs';
import { Conge } from '../models/conge';
import { CongeService } from '../conge.service';

@Component({
  selector: 'app-emp-request',
  templateUrl: './emp-request.component.html',
  styleUrls: ['./emp-request.component.css']
})
export class EmpRequestComponent {
  requestId='';
  employeId='';
  employe$: Observable<Employe> | undefined;
  conge$: Observable<Conge> | undefined;
  showSuccessToast: boolean = false;
  showDeletedToast=false;

  constructor(
    private route: ActivatedRoute,
    private employeService:EmployeService,
    private congeService:CongeService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.requestId = params.get('requestId')!;
      this.employeId = params.get('employeId')!;
      
      this.fetchEmployeDetails(this.employeId);
      this.fetchCongeDetails(this.requestId);

    });
  }
  fetchEmployeDetails(id: string): void {
   
    this.employe$ = this.employeService.getEmployeById(id);
  }
  fetchCongeDetails(id: string): void {
   
    this.conge$ = this.congeService.getCongeById(id);
  }
 

  calculateDuration(dateDebut: Date, dateFin: Date): number {
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  }

  acceptConge(id: string): void {

    this.congeService.acceptConge(id).subscribe(conge => {
      console.log('Conge accepted:', conge);

      this.showSuccessToast = true;
      setTimeout(() => this.showSuccessToast = false, 3000);

    
    });


  }
  closeToastS(){
    this.showSuccessToast=false;
  }


  rejectConge(id: string): void {
    this.congeService.rejectConge(id).subscribe(conge => {
      console.log('Conge rejected:', conge);
      this.showDeletedToast=true;
      setTimeout(() => this.showDeletedToast = false, 3000);
    });
  }
   closeToastD(){
    this.showDeletedToast=false;
  }
}
