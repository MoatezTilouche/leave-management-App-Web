import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangePasswordDto } from './change-password-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password });
  }

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, data);
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/auth/profile`, { headers });
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  signOut() {
    localStorage.removeItem('token'); 
    
  }
  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/forgot-password`, { email });
  }
  changePassword(adminId: string, changePasswordDto: ChangePasswordDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/'admin/${adminId}/change-password`, changePasswordDto);
  }
  requestPasswordReset(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/request-password-reset`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/reset-password`, { token, newPassword });
  }
}
