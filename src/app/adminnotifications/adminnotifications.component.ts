import { Component } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { AdminNotification } from '../models/notification';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adminnotifications',
  templateUrl: './adminnotifications.component.html',
  styleUrls: ['./adminnotifications.component.css']
})
export class AdminnotificationsComponent {
  notifications: AdminNotification[] = [];
adminId:any;
  constructor(private notificationService: NotificationsService,private router:Router,private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.adminId = params.get('adminId')!;
    });
  
    this.notificationService.getNotificationsForAdmin(this.adminId).subscribe(
      (data) => {
        console.log('Raw data:', data); // Ajoutez ceci pour voir les données reçues
        this.notifications = data.map(notification => {
          return { ...notification, dateNotif: new Date(notification.dateNotif) };
        }).sort((a, b) => b.dateNotif.getTime() - a.dateNotif.getTime());
  
        console.log('Sorted notifications:', this.notifications); // Vérifiez les données triées
      },
      (error) => {
        console.error('Error fetching notifications', error);
      }
    );
  }
  
  
  

  deleteNotification(notificationId: string): void {
    this.notificationService.deleteNotification(notificationId).subscribe(
      () => {
        this.notifications = this.notifications.filter(n => n._id !== notificationId);
      },
      (error) => {
        console.error('Error deleting notification', error);
      }
    );
  }
}
