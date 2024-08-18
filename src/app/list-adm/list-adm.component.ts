import { Component } from '@angular/core';
import { Admin } from '../models/admin';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-list-adm',
  templateUrl: './list-adm.component.html',
  styleUrls: ['./list-adm.component.css']
})
export class ListAdmComponent {
  admins: Admin[] = [];
  filteredAdmins: Admin[] = [];
  searchTerm: string = '';
  showDeletedToast = false;
  permissions: any;

  constructor(private adminService: AdminService, private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.adminService.getAdmins().subscribe((data) => {
      this.admins = data;
      this.filteredAdmins = data;
    });
    this.loadProfile();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  deleteAdmin(id: string): void {
    this.adminService.deleteAdmin (id).subscribe(() => {
      this.admins = this.admins.filter(admin => admin._id !== id);
      this.filteredAdmins = this.filteredAdmins.filter(admin => admin._id !== id);
      this.showDeletedToast = true;
      setTimeout(() => this.showDeletedToast = false, 3000);
      console.log("deleted");
    });
  }

  closeToast(): void {
    this.showDeletedToast = false;
  }

  viewAdminDetails(adminId: string): void {
    this.router.navigate(['/editAdm', adminId]);
  }

  filterAdmins(): void {
    if (this.searchTerm) {
      this.filteredAdmins = this.admins.filter(admin => 
        admin.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        admin.department.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredAdmins = this.admins;
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
