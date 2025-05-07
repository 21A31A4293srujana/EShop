import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { GenericToastProps, Severity } from '../../model/CartProduct';

@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.scss',
})
export class MyaccountComponent {
  toggleForm: boolean = true;
  buttonInvalide: boolean = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  signUpForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  forgotPassword() {
    const email = this.loginForm.get('email')?.value;
    if (!email) {
      const toast: GenericToastProps = {
        severity: Severity.warn,
        summary: 'Warning',
        detail: 'Please enter your email address first',
      };
      this.toastService.displayGenericToast(toast);
      return;
    }

    this.auth.forgotPassword(email).subscribe({
      next: (response) => {
        const toast: GenericToastProps = {
          severity: Severity.success,
          summary: 'Success',
          detail: 'Password reset instructions have been sent to your email',
        };
        this.toastService.displayGenericToast(toast);
      },
      error: (error) => {
        const toast: GenericToastProps = {
          severity: Severity.error,
          summary: 'Error',
          detail: 'Failed to process password reset request. Please try again.',
        };
        this.toastService.displayGenericToast(toast);
      },
    });
  }

  loginSubmit() {
    this.loginForm.get('email')?.markAsTouched();
    this.loginPassword?.markAsTouched();
    if (this.loginForm.status === 'VALID') {
      this.buttonInvalide = true;
      this.auth
        .login(this.loginForm.value.email!, this.loginForm.value.password!)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/home']);
            this.buttonInvalide = false;
          },
          error: (error) => {
            console.error(error);
            const signupToast: GenericToastProps = {
              severity: Severity.error,
              summary: 'Error',
              detail:" The email address or password is not valid",
            };
            this.toastService.displayGenericToast(signupToast);
            this.buttonInvalide = false;
          },
        });
    }
  }

  signUpSubmit() {
    this.signUpForm.get('email')?.markAsTouched();
    this.signUpForm.get('password')?.markAsTouched();
    this.signUpForm.get('name')?.markAsTouched();
    
    if (this.signUpForm.status === 'VALID') {
      this.buttonInvalide = true;
      
      this.auth
        .signup(
          this.signUpForm.value.email!,
          this.signUpForm.value.password!,
          this.signUpForm.value.name!
        )
        .subscribe({
          next: (response) => {
            this.toggleForm = true;
            const signupToast: GenericToastProps = {
              severity: Severity.success,
              summary: 'Success',
              detail: 'Account created successfully. Please log in.',
            };
            this.toastService.displayGenericToast(signupToast);
            this.signUpForm.reset();
            this.buttonInvalide = false;
          },
          error: (error) => {
            let errorMessage = 'Registration failed. Please try again.';
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            } else if (error.message) {
              errorMessage = error.message;
            }
            
            const signupToast: GenericToastProps = {
              severity: Severity.error,
              summary: 'Registration Failed',
              detail: errorMessage,
            };
            this.toastService.displayGenericToast(signupToast);
            this.buttonInvalide = false;
          },
        });
    } else {
      const signupToast: GenericToastProps = {
        severity: Severity.error,
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly.',
      };
      this.toastService.displayGenericToast(signupToast);
    }
  }

  switchForm() {
    this.toggleForm = !this.toggleForm;
  }

  get loginEmail() {
    return this.loginForm.get('email');
  }
  get loginPassword() {
    return this.loginForm.get('password');
  }

  get signUpEmail() {
    return this.signUpForm.get('email');
  }
  get signUpPassword() {
    return this.signUpForm.get('password');
  }
  get signUpName() {
    return this.signUpForm.get('name');
  }
}
