/// <reference types="datatables.net" />
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatButtonModule, MatInputModule, FormsModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'phone', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  searchValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  http = inject(HttpClient);
  auth = inject(AuthService);
  userService = inject(UserService)
  currentUser = this.auth.getUser();

  ngOnInit(): void {
    this.fetchUsers();
  }


  fetchUsers() {
    this.userService.getNonDeletedUsers().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => alert('Failed to fetch users')
    });
  }

  applyFilter(): void {
    debugger
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }

  logout(): void {
    this.auth.logout();
  }

  clearFilter(): void {
    this.searchValue = '';
    this.applyFilter();
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isViewer(): boolean {
    return this.currentUser?.role === 'viewer';
  }

  deleteUser(user: any): void {
    this.userService.softDeleteUser(user).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
      },
      error: () => alert("Failed to delete user")
    })
  }
}
