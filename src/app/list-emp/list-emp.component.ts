import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../employe.service';
import { Employe } from '../models/employe';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-list-emp',
  templateUrl: './list-emp.component.html',
  styleUrls: ['./list-emp.component.css']
})
export class ListEmpComponent implements OnInit {
  employes: Employe[] = [];
  filteredEmployes: Employe[] = [];
  searchTerm: string = '';
  showDeletedToast = false;
  permissions: any;

  constructor(private employeService: EmployeService, private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.employeService.getEmployes().subscribe((data) => {
      this.employes = data;
      this.filteredEmployes = data;
    });
    this.loadProfile();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  deleteEmploye(id: string): void {
    this.employeService.deleteEmploye(id).subscribe(() => {
      this.employes = this.employes.filter(employe => employe._id !== id);
      this.filteredEmployes = this.filteredEmployes.filter(employe => employe._id !== id);
      this.showDeletedToast = true;
      setTimeout(() => this.showDeletedToast = false, 3000);
      console.log("deleted");
    });
  }

  closeToast(): void {
    this.showDeletedToast = false;
  }

  viewEmployeDetails(employeId: string): void {
    this.router.navigate(['/editEmp', employeId]);
  }
  showleaveRequests(employeId:string):void{
    this.router.navigate(['/requestsEmp', employeId]);
  }

  filterEmployees(): void {
    if (this.searchTerm) {
      this.filteredEmployes = this.employes.filter(employe => 
        employe.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employe.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employe.department.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredEmployes = this.employes;
    }
  }
  private loadProfile() {
    this.authService.getProfile().subscribe(
      profile => {
       
        this.permissions=profile.permissions;
      },
      err => {
        console.error('Failed to load profile', err);
      }
    );
  }
}
