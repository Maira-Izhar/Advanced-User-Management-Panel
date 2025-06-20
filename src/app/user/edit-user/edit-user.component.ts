import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {

  form!: FormGroup;
  userId!: number;
  currentUser = inject(AuthService).getUser();

  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  userService = inject(UserService);

  private isDeleted = false;

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required]],
      role: ['', Validators.required],
      gender: ['', [Validators.required]],
      dob: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserById(this.userId)
      .subscribe({
        next: (user) => this.form.patchValue(user),
        error: () => alert('Failed to load user')
      });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const updatedUser = {
      id: this.userId,
      ...this.form.value,
      isDeleted: this.isDeleted
    };
    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: () => {
        alert('User updated!');
        this.router.navigate(['/users']);
      },
      error: () => alert('Update failed')
    });
  }
}
