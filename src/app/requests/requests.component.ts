import { Component, OnInit } from '@angular/core';
import { CongeService } from '../conge.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  conges: any[] = [];
  filteredConges: any[] = [];
  paginatedConges: any[] = [];
  filterPeriod: string = 'month';
  filterPeriodText: string = 'Last month';
  filterTypeConge: string = 'All';
  filterStatus:string='All';
  searchQuery: string = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;

  Math = Math;
  permissions: any;

  constructor(private congeService: CongeService, private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.congeService.getAllConges().subscribe(data => {
      this.conges = data;
      this.applyFilters();
    });
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

  setFilterStatus(status:string): void{
    this.filterStatus=status;
    this.applyFilters();
  }

  applyFilters(): void {
    const now = new Date();
    let filteredByPeriod = this.conges;

    switch (this.filterPeriod) {
      case 'day':
        filteredByPeriod = this.conges.filter(item => {
          const dateDebut = new Date(item.conge.dateDebut);
          return now.getDate() >= dateDebut.getDate() + 1 &&
            now.getMonth() === dateDebut.getMonth() &&
            now.getFullYear() === dateDebut.getFullYear();
        });
        break;
      case 'week':
        filteredByPeriod = this.conges.filter(item => {
          const dateDebut = new Date(item.conge.dateDebut);
          return now.getDate() + 7 > dateDebut.getDate() &&
            now.getMonth() === dateDebut.getMonth() &&
            now.getFullYear() === dateDebut.getFullYear();
        });
        break;
      case 'month':
        filteredByPeriod = this.conges.filter(item => {
          const dateDebut = new Date(item.conge.dateDebut);
          return now.getMonth() === dateDebut.getMonth() &&
            now.getFullYear() === dateDebut.getFullYear();
        });
        break;
      case 'year':
        filteredByPeriod = this.conges.filter(item => {
          const dateDebut = new Date(item.conge.dateDebut);
          return now.getFullYear() === dateDebut.getFullYear();
        });
        break;
    }

    let filteredByTypeConge = filteredByPeriod;
    if (this.filterTypeConge !== 'All') {
      filteredByTypeConge = filteredByPeriod.filter(item => item.conge.typeConge === this.filterTypeConge);
    }

    this.filteredConges = filteredByTypeConge.filter(item => {
      const searchStr = this.searchQuery.toLowerCase();
      return item.employeName?.name?.toLowerCase().includes(searchStr) ||
        item.conge.typeConge.toLowerCase().includes(searchStr);
    });

    let filteredByStatus = filteredByTypeConge;
    if (this.filterStatus !== 'All') {
      filteredByStatus = filteredByTypeConge.filter(item => item.conge.statut === this.filterStatus);
    }

    // Filter by search query
    this.filteredConges = filteredByStatus.filter(item => {
      const searchStr = this.searchQuery.toLowerCase();
      return item.employeName?.name?.toLowerCase().includes(searchStr) || 
             item.conge.typeConge.toLowerCase().includes(searchStr);
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
