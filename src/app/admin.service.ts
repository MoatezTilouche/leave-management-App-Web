import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from './models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) {}


  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  getAdminById(id: string): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/${id}`);
  }

  updateAdmin(id: string, admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.apiUrl}/${id}`, admin);
  }

  uploadPhoto(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${id}/photo`, formData);
  }

  getAdminCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count`);
  }

  getESDepCount(id:string):Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/${id}/employee-count`);
  }
  deleteAdmin(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
