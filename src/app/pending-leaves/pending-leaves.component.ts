import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CongeService } from '../conge.service';

@Component({
  selector: 'app-pending-leaves',
  templateUrl: './pending-leaves.component.html',
  styleUrls: ['./pending-leaves.component.css']
})
export class PendingLeavesComponent {
  conges: any[] = [];
  filteredConges: any[] = [];
  paginatedConges: any[] = [];
  filterPeriod: string = 'month';
  filterPeriodText: string = 'Last month';
  filterTypeConge: string = 'All';
  searchQuery: string = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;

  Math = Math;

  constructor(private congeService: CongeService, private router: Router) {}

  ngOnInit(): void {
    this.congeService.getPendingConges().subscribe(data => {
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
}

