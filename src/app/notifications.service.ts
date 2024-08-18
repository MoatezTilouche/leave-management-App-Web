// src/app/notification.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminNotification } from './models/notification';



@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = 'http://localhost:3000/notifications'; // Update with your actual API URL

  constructor(private http: HttpClient) {}

  getNotificationsForAdmin(adminId: string): Observable<AdminNotification[]> {
    return this.http.get<AdminNotification[]>(`${this.apiUrl}/admin/${adminId}`);
  }

  deleteNotification(notificationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${notificationId}`);
  }
}
