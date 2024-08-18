import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from './models/employe';
import { Conge } from './models/conge';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = 'http://localhost:3000/employe';

  constructor(private http: HttpClient) {}

  getEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.apiUrl);
  }

  deleteEmploye(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  uploadPhoto(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${id}/photo`, formData);
  }
  updateEmploye(id: string, employe: Employe): Observable<Employe> {
    return this.http.put<Employe>(`${this.apiUrl}/${id}`, employe);
  }

  getEmployeById(id:string):Observable<Employe>{
    return this.http.get<Employe>(`${this.apiUrl}/${id}`);
  }

  getEmployeeConges(employeId: string): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/${employeId}/conges`);
  }
  
}
