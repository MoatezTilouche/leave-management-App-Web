import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-adm',
  templateUrl: './add-adm.component.html',
  styleUrls: ['./add-adm.component.css']
})
export class AddAdmComponent {
  adminForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  showSuccessToast: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    const currentDate = new Date().toISOString().split('T')[0]; 

    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      
      age: ['', Validators.required],
      sexe: ['', Validators.required],
      department: ['', Validators.required],
      permissions: ['', Validators.required],
    
      role: ['admin'],
      dateInscription: [currentDate, Validators.required] 
    },) ;
  }



  onSubmit() {
    if (this.adminForm.valid) {
      this.http.post('http://localhost:3000/auth/signup', this.adminForm.value).subscribe(response => {
        console.log('Admin created', response);
        this.showSuccessToast = true;
        setTimeout(() => {
          this.showSuccessToast = false;
          this.router.navigate(['/admins']); // Navigate to some path after successful creation, if needed
        }, 3000);
      }, error => {
        console.error('Error creating admin', error);
      });
    }
  }

  closeToast() {
    this.showSuccessToast = false;
  }

  
}

