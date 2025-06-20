import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  step = 1;
  submitted = false;
  lastId = 0;
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
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
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        const ids = users.map((u: any) => Number(u.id));
        this.lastId = ids.length > 0 ? Math.max(...ids) : 0;
      }
    })
  }

  nextStep(): void {
    this.submitted = true;
    if (this.step === 1 && this.form.get('name')?.valid && this.form.get('phone')?.valid && this.form.get('gender')?.valid
      && this.form.get('dob')?.valid && this.form.get('address')?.valid) {
      this.step = 2;
      this.submitted = false;
    }
  }

  prevStep(): void {
    this.step = 1;
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      const newUser = {
        id: (++this.lastId).toString(),
        ...this.form.value,
        isDeleted: false,
      };
      this.userService.addUser(newUser).subscribe({
        next: () => {
          this.form.reset();
          this.step = 1;
          this.submitted = false;
        },
        error: () => {
          alert("failed to add user");
        }
      })
      this.router.navigate(['/users']);
    }
  }
}