import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../employe.service';
import { Employe } from '../models/employe';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {
  employeeForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  showSuccessToast = false;
  employeId='';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeService: EmployeService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
      age: ['', Validators.required],
      sexe: ['', Validators.required],
      department: [''],
      soldeConges:[''],
      soldeMaladie:[''],
      photo: [''],

    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.employeId = params.get('employeId')!;
      this.employeService.getEmployeById(this.employeId).subscribe(employe => {
        console.log('Employee Data Loaded:', employe); // Log fetched employee data
        this.employeeForm.patchValue({
          name: employe.name,
          email: employe.email,
          age: employe.age,
          sexe: employe.sexe,
          department: employe.department,
          soldeConges: employe.soldeConges,
          soldeMaladie: employe.soldeMaladie,
          photo: employe.photo
        });
      }, error => {
        console.error('Error loading employee data:', error);
      });
    });
  }
  

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmploye: Employe = { ...this.employeeForm.value, id: this.employeId };
      console.log('Form Data:', updatedEmploye);
      this.employeService.updateEmploye(this.employeId, updatedEmploye).subscribe(() => {
        this.showSuccessToast = true;
        setTimeout(() => {
          this.showSuccessToast = false;
          this.router.navigate(['/employes']);
        }, 3000);
      }, error => {
        console.error('Error updating employee:', error);
      });
    } else {
      console.error('Form is invalid:', this.employeeForm);
    }
  }
  

  closeToast(): void {
    this.showSuccessToast = false;
  }

  onPhotoUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.employeService.uploadPhoto(this.employeId, file).subscribe((data: any) => {
      this.employeeForm.patchValue({ photo: data.photoUrl });
    });
  }
}
