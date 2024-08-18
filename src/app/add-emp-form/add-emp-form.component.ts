import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-emp-form',
  templateUrl: './add-emp-form.component.html',
  styleUrls: ['./add-emp-form.component.css']
})
export class AddEmpFormComponent {
  employeeForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  showSuccessToast: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    const currentDate = new Date().toISOString().split('T')[0]; 

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
   
      age: ['', Validators.required],
      sexe: ['', Validators.required],
      department: ['', Validators.required],
      soldeConges: [0],
      soldeMaladie: [5],
      role: ['employe'],
      dateInscription: [currentDate, Validators.required] 
    },);
  }

 



  onSubmit() {
    if (this.employeeForm.valid) {
      this.http.post('http://localhost:3000/auth/signup', this.employeeForm.value).subscribe(response => {
        console.log('Employee created', response);
        this.showSuccessToast = true;
        setTimeout(() => {
          this.showSuccessToast = false;
          this.router.navigate(['/employes']); // Navigate to some path after successful creation, if needed
        }, 3000);
      }, error => {
        console.error('Error creating employee', error);
      });
    }
  }

  closeToast() {
    this.showSuccessToast = false;
  }

  
}
