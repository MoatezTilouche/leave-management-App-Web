import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  name = 'User';
  photo = '';
  email = '';
  id='';
  permissions='';
  

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadProfile();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
  viewProfileDetails(adminId: string): void {
    this.router.navigate(['/profile', adminId]);
  }
  viewNotifs(adminId: string): void {
    this.router.navigate(['/notifications', adminId]);
  }



  private loadProfile() {
    this.authService.getProfile().subscribe(
      profile => {
        this.name = profile.name; 
        this.photo = profile.photo;
        this.email = profile.email;
        this.id=profile._id;
        this.permissions=profile.permissions;
      },
      err => {
        console.error('Failed to load profile', err);
      }
    );
  }
  signOut() {
    this.authService.signOut(); 
    this.router.navigate(['/login']); 

  }
}
