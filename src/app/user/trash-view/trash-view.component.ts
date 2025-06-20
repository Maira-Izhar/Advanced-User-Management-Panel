import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AuthService } from '../../auth.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-trash-view',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './trash-view.component.html',
  styleUrl: './trash-view.component.css'
})
export class TrashViewComponent {
  users: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['id', 'name', 'email', 'role', 'actions'];
  http = inject(HttpClient);
  auth = inject(AuthService);
  userService = inject(UserService)

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadDeletedUsers();
  }

  loadDeletedUsers(): void {
    this.userService.getDeletedUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
      },
      error: () => alert('Failed to load trash users')
    });
  }

  restoreUser(user: any): void {
    const updatedUser = { ...user, isDeleted: false };
    this.userService.restoreUser(updatedUser).subscribe({
      next: () => {
        alert('User restored');
        this.loadDeletedUsers();
      },
      error: () => alert('Failed to restore user')
    });
  }
}
