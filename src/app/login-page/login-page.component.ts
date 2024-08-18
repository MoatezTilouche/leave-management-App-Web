import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (res: any) => {
          this.authService.storeToken(res.access_token);

          
          this.authService.getProfile().subscribe(
            (profile) => {
              const role = profile.role;
              const permissions=profile.permissions;

              if ((role === "admin")  ){
                this.router.navigate(['/dashboard']);
              } else {
                alert('Login failed. You don\'t have access.');
              }
            },
            (err) => {
              console.error('Failed to load user profile', err);
            }
          );
        },
        (err) => {
          console.error('Login failed', err);
          alert('Login failed. Please check your credentials and try again.');
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  openForgotPasswordModal() {
    const modal = new bootstrap.Modal(document.getElementById('forgotPasswordModal') as HTMLElement);
    modal.show();
  }

  submitForgotPassword() {
    const email = this.forgotPasswordForm.value.email;
    this.authService.forgotPassword(email).subscribe(
      (response) => {
        alert('Password reset email sent successfully.');
      },
      (error) => {
        console.error('Forgot password failed', error);
        alert('Failed to send password reset email.');
      }
    );
  }
}
