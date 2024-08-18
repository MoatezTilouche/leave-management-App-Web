import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../employe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Conge } from '../models/conge';
import { CongeService } from '../conge.service';

@Component({
  selector: 'app-requests-emp',
  templateUrl: './requests-emp.component.html',
  styleUrls: ['./requests-emp.component.css']
})
export class RequestsEmpComponent implements OnInit {
  conges: any[] = [];
  filteredConges: any[] = [];
  paginatedConges: any[] = [];
  filterPeriod: string = 'month';
  filterPeriodText: string = 'Last month';
  filterTypeConge: string = 'All';
  filterStatus: string = 'All';
  searchQuery: string = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;

  Math = Math;

  constructor(
    private employeService: EmployeService,
    private router: Router,
    private route: ActivatedRoute ,
    private congeService:CongeService// Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the employee ID from the route parameters
    const employeId = this.route.snapshot.paramMap.get('employeId');

    if (employeId) {
      this.employeService.getEmployeeConges(employeId).subscribe((data: Conge[]) => {
        this.conges = data;
        this.applyFilters();
      });
    }
  }

  setFilterPeriod(period: string, text: string): void {
    this.filterPeriod = period;
    this.filterPeriodText = text;
    this.applyFilters();
  }

  setFilterTypeConge(typeConge: string): void {
    this.filterTypeConge = typeConge;
    this.applyFilters();
  }

  setFilterStatus(status: string): void {
    this.filterStatus = status;
    this.applyFilters();
  }

  applyFilters(): void {
    const now = new Date();
    let filteredByPeriod = this.conges;

    switch (this.filterPeriod) {
      case 'day':
        filteredByPeriod = this.conges.filter(item => {
          const dateDebut = new Date(item.dateDebut);
          return now.getDate() >= dateDebut.getDate() + 1 &&
            now.getMonth() === dateDebut.getMonth() &&
            now.getFullYear() === dateDebut.getFullYear();
        });
        break;
      case 'week':
        filteredByPeriod = this.conges.filter(item => {
          const dateDebut = new Date(item.dateDebut);
          return now.getDate() + 7 > dateDebut.getDate() &&
            now.getMonth() === dateDebut.getMonth() &&
            now.getFullYear() === dateDebut.getFullYear();
        });
        break;
      case 'month':
        filteredByPeriod = this.conges.filter(item => {
          const dateDebut = new Date(item.dateDebut);
          return now.getMonth() === dateDebut.getMonth() &&
            now.getFullYear() === dateDebut.getFullYear();
        });
        break;
      case 'year':
        filteredByPeriod = this.conges.filter(item => {
          const dateDebut = new Date(item.dateDebut);
          return now.getFullYear() === dateDebut.getFullYear();
        });
        break;
    }

    let filteredByTypeConge = filteredByPeriod;
    if (this.filterTypeConge !== 'All') {
      filteredByTypeConge = filteredByPeriod.filter(item => item.typeConge === this.filterTypeConge);
    }

    this.filteredConges = filteredByTypeConge.filter(item => {
      const searchStr = this.searchQuery.toLowerCase();
      return item.employeName?.name?.toLowerCase().includes(searchStr) ||
        item.typeConge.toLowerCase().includes(searchStr);
    });

    let filteredByStatus = filteredByTypeConge;
    if (this.filterStatus !== 'All') {
      filteredByStatus = filteredByTypeConge.filter(item => item.statut === this.filterStatus);
    }

    this.filteredConges = filteredByStatus.filter(item => {
      const searchStr = this.searchQuery.toLowerCase();
      return item.employeName?.name?.toLowerCase().includes(searchStr) || 
             item.typeConge.toLowerCase().includes(searchStr);
    });

    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedConges = this.filteredConges.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.filteredConges.length / this.itemsPerPage)) {
      this.currentPage = page;
      this.paginate();
    }
  }

  viewCongeDetails(requestId: string, employeId: string) {
    this.router.navigate(['/empRequest', requestId, employeId]);
  }

  deleteConge(id: string): void {
    this.congeService.deleteConge(id).subscribe(
      () => {
        this.conges = this.conges.filter(conge => conge._id !== id);
        this.filteredConges = this.filteredConges.filter(conge => conge._id !== id);
        this.paginate();
        console.log("Conge deleted successfully");
      },
      (error) => {
        console.error("Error deleting conge:", error);
      }
    );
  }
  acceptConge(id: string): void {

    this.congeService.acceptConge(id).subscribe(conge => {
      console.log('Conge accepted:', conge);



    
    });


  }
 


  rejectConge(id: string): void {
    this.congeService.rejectConge(id).subscribe(conge => {
      console.log('Conge rejected:', conge);
    
   
    });
  }

}
