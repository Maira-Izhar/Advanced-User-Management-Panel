import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.auth.login(email, password)
      .pipe(
        catchError(err => {
          this.errorMessage = 'Server error. Please try again.';
          return of(null);
        })
      )
      .subscribe({
        next: (user) => {
          if (!user) {
            this.errorMessage = 'Invalid credentials.';
          } else if (user.isDeleted) {
            this.errorMessage = 'Your account has been deleted.';
          } else {
            this.auth.setUser(user);
            console.log('user logged in')
            this.router.navigate(['/users']);
          }
        },
        error: (err) => {
          this.errorMessage = 'Unexpected error. Please try again.';
        }
      });
  }
}
