import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';
import { Admin } from '../models/admin';
import { StatsService } from '../stats.service';
import { Employe } from '../models/employe';
import { EmployeService } from '../employe.service';
declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  adminForm: FormGroup;
  passwordForm: FormGroup;
  resetRequestForm: FormGroup;
  resetPasswordForm: FormGroup;
  showSuccessToast = false;
  showPasswordError = false;
  adminId = '';
  photo: any;
  name: any;
  email: any;
  id: any;
  dateInscription: any;
  sexe: any;
  department: any;
  isEditing = false;
  isEditingPass = false;
  showPassword = false;
  showConfirmPassword = false;
  adminCount = 0;
  pendingCount = 0;
  depCount = 2;
  employeCount = 0;
  employes: Employe[] = [];
  admins: Admin[] = [];
  showNewPassword = false;
  permissions: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private authService: AuthService,
    private statsService: StatsService,
    private employeService: EmployeService
  ) {
    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      sexe: ['', Validators.required],
      permissions: ['', Validators.required],
      photo: [''],
      department: ['', Validators.required],
    
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });

    this.resetRequestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.resetPasswordForm = this.fb.group({
      token: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProfile();
    this.loadPendingCount();
    this.loadEmpDepCount();
    this.loadEmployeCount();

    this.employeService.getEmployes().subscribe((data) => {
      this.employes = data;
    });

    this.adminService.getAdmins().subscribe((data) => {
      this.admins = data;
      this.adminCount = this.admins.length;
    });
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

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    
  }

  toggleEditPass(): void {
    this.isEditingPass = !this.isEditingPass;
    this.closeOtherForms();
  }

  toggleRequestReset(): void {
    this.openModal('requestResetModal');
    this.closeOtherForms();
  }

  toggleResetPassword(): void {
    this.openModal('resetPasswordModal');
    this.closeOtherForms();
  }

  onSubmit(): void {
    if (this.adminForm.valid) {
      const updatedAdmin: Admin = { ...this.adminForm.value, id: this.adminId };
      this.adminService.updateAdmin(this.adminId, updatedAdmin).subscribe(() => {
        this.showSuccessToast = true;
        setTimeout(() => {
          this.showSuccessToast = false;
          this.isEditing = false;
        }, 3000);
      }, error => {
        console.error('Error updating admin:', error);
      });
    }
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.valid) {
      const currentPassword = this.passwordForm.get('currentPassword')?.value;
      const newPassword = this.passwordForm.get('newPassword')?.value;
      const confirmPassword = this.passwordForm.get('confirmPassword')?.value;

      if (newPassword !== confirmPassword) {
        this.showPasswordError = true;
        return;
      }

      this.authService.changePassword(currentPassword, newPassword).subscribe(() => {
        this.showSuccessToast = true;
        setTimeout(() => {
          this.showSuccessToast = false;
          this.isEditingPass = false;
        }, 3000);
      }, error => {
        console.error('Error changing password:', error);
        this.showPasswordError = true;
      });
    }
  }

  onRequestResetSubmit() {
    if (this.resetRequestForm.valid) {
      this.authService.requestPasswordReset(this.resetRequestForm.get('email')?.value)
        .subscribe({
          next: () => {
            alert('Reset token sent to your email.');
            this.closeModal('requestResetModal');
            this.openModal('resetPasswordModal');
          },
          error: (err) => {
            console.error('Error requesting password reset:', err);
          }
        });
    }
  }

  onResetPasswordSubmit() {
    if (this.resetPasswordForm.valid) {
      const { token, newPassword, confirmPassword } = this.resetPasswordForm.value;
      if (newPassword === confirmPassword) {
        this.authService.resetPassword(token, newPassword)
          .subscribe({
            next: () => {
              alert('Password successfully reset.');
              this.closeModal('resetPasswordModal');
            },
            error: (err) => {
              console.error('Error resetting password:', err);
              this.showPasswordError = true;
            }
          });
      } else {
        this.showPasswordError = true;
      }
    }
  }

  openModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  closeOtherForms(): void {
    this.isEditing = false;
    this.isEditingPass = false;
    this.closeModal('requestResetModal');
    this.closeModal('resetPasswordModal');
  }

  onPhotoUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.adminService.uploadPhoto(this.adminId, file).subscribe((data: any) => {
      this.adminForm.patchValue({ photo: data.photoUrl });
    });
  }

  closeToast(): void {
    this.showSuccessToast = false;
    this.showPasswordError = false;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  private loadProfile() {
    this.authService.getProfile().subscribe(
      profile => {
        this.name = profile.name;
        this.photo = profile.photo;
        this.email = profile.email;
        this.id = profile._id;
        this.dateInscription = profile.dateInscription;
        this.sexe = profile.sexe;
        this.department = profile.department;
        this.permissions=profile.permissions;
      },
      err => {
        console.error('Failed to load profile', err);
      }
    );
  }

  loadPendingCount() {
    this.statsService.getPendingCount().subscribe(
      (response) => {
        this.pendingCount = response.count;
        console.log(this.pendingCount);
      },
      (error) => {
        console.error('Failed to load Pending Leaves count', error);
      }
    );
  }

  loadEmpDepCount() {
    this.adminService.getESDepCount(this.adminId).subscribe(
      (response) => {
        this.depCount = response.count;
      },
      (error) => {
        console.error('Failed to load Dep count', error);
      }
    );
  }

  loadEmployeCount() {
    this.statsService.getEmployeCount().subscribe(
      (response) => {
        this.employeCount = response.count;
      },
      (error) => {
        console.error('Failed to load employee count', error);
      }
    );
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  // Method to toggle visibility of the Confirm Password field

}
