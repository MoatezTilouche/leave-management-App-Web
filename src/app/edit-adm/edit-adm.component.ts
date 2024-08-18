import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../employe.service';
import { Employe } from '../models/employe';
import { AdminService } from '../admin.service';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-edit-adm',
  templateUrl: './edit-adm.component.html',
  styleUrls: ['./edit-adm.component.css']
})
export class EditAdmComponent {
  adminForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  showSuccessToast = false;
  adminId='';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {
    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
      age: ['', Validators.required],
      sexe: ['', Validators.required],
      department: [''],
      permissions: [''],

      photo: [''],

    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.adminId = params.get('adminId')!;
      this.adminService.getAdminById(this.adminId).subscribe(admin => {
        this.adminForm.patchValue({
          name: admin.name,
          email: admin.email,
          age: admin.age,
          sexe: admin.sexe,
          department: admin.department,
          permissions:admin.permissions,
          photo: admin.photo
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
    if (this.adminForm.valid) {
      const updatedAdmin: Admin = { ...this.adminForm.value, id: this.adminId };
      console.log('Form Data:', updatedAdmin);
      this.adminService.updateAdmin(this.adminId, updatedAdmin).subscribe(() => {
        this.showSuccessToast = true;
        setTimeout(() => {
          this.showSuccessToast = false;
          this.router.navigate(['/employes']);
        }, 3000);
      }, error => {
        console.error('Error updating employee:', error);
      });
    } else {
      console.error('Form is invalid:', this.adminForm);
    }
  }
  

  closeToast(): void {
    this.showSuccessToast = false;
  }

  onPhotoUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.adminService.uploadPhoto(this.adminId, file).subscribe((data: any) => {
      this.adminForm.patchValue({ photo: data.photoUrl });
    });
  }
}
