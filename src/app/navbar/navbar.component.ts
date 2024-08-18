// src/app/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AdminNotification } from '../models/notification';
import { NotificationsService } from '../notifications.service';
import { EmployeService } from '../employe.service';
import { Employe } from '../models/employe';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  name = 'Admin';
  photo = '';
  email = '';
  id = '';
  notifications: AdminNotification[] = [];
  showNotifications = false;

  constructor(
    private authService: AuthService,
    private employeService: EmployeService,
    private router: Router,
    private notificationService: NotificationsService
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  private loadProfile() {
    this.authService.getProfile().subscribe(
      profile => {
        this.name = profile.name;
        this.photo = profile.photo;
        this.email = profile.email;
        this.id = profile._id;
        this.loadNotifications(); // Ensure notifications load after ID is available
      },
      err => {
        console.error('Failed to load profile', err);
      }
    );
  }

  private loadNotifications() {
    if (this.id) {
      this.notificationService.getNotificationsForAdmin(this.id).subscribe(
        data => {
          this.notifications = data;
          this.loadEmployePhotos();
        },
        error => {
          console.error('Error fetching notifications', error);
        }
      );
    }
  }

  private loadEmployePhotos() {
    const observables = this.notifications.map(notification => {
      if (notification.employe) {
        return this.employeService.getEmployeById(notification.employe).toPromise();
      } else {
        return Promise.resolve(undefined); // Return undefined if employe ID is null/undefined
      }
    });
  
    forkJoin(observables).subscribe(
      (employes: (Employe | undefined)[]) => {
        this.notifications = this.notifications.map((notification, index) => {
          const employe = employes[index];
          notification.employePhoto = employe ? employe.photo : 'https://i.pinimg.com/564x/af/ed/7c/afed7cd07771c71d150681480ed59582.jpg';
          return notification;
        });
      },
      error => {
        console.error('Error fetching employee photos', error);
      }
    );
  }
  
  

  deleteNotification(notificationId: string): void {
    this.notificationService.deleteNotification(notificationId).subscribe(
      () => {
        this.notifications = this.notifications.filter(n => n._id !== notificationId);
      },
      error => {
        console.error('Error deleting notification', error);
      }
    );
  }

  viewAllNotifications(): void {
    this.router.navigate(['/admin-notifications']);
  }
}
