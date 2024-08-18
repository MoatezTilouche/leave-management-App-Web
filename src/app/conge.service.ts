import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conge } from './models/conge';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private apiUrl = 'http://localhost:3000/conges';

  constructor(private http: HttpClient) {}

  getAllConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/requests`);
  }

  getPendingConges():Observable<Conge[]>{
    return this.http.get<Conge[]>(`${this.apiUrl}/pending`);
  }

  getCongeById(id:string):Observable<Conge>{
    return this.http.get<Conge>(` ${this.apiUrl}/${id} `);
  }

  acceptConge(id: string): Observable<Conge> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<Conge>(`${this.apiUrl}/${id}/accept`, {}, { headers });
  }
  
  rejectConge(id: string): Observable<Conge> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<Conge>(`${this.apiUrl}/${id}/reject`, {}, { headers });
  }
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  getToken() {
    return localStorage.getItem('token');
  }

  deleteConge(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}