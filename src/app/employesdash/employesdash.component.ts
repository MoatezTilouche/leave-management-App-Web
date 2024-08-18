import { Component } from '@angular/core';
import { EmployeService } from '../employe.service';
import { Employe } from '../models/employe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employesdash',
  templateUrl: './employesdash.component.html',
  styleUrls: ['./employesdash.component.css']
})
export class EmployesdashComponent {
  employees: Employe[] = [];

  constructor(private employeService: EmployeService,private router:Router) {}

  ngOnInit(): void {
    this.employeService.getEmployes().subscribe(data => {
      this.employees = data;
    });
  }
  viewEmploye( employeId: string) {
    this.router.navigate(['/editEmp', employeId]);
  }
}
