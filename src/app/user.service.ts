import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  addUser(userData: any): Observable<any> {
    return this.http.post(this.apiURL, userData).pipe(
      catchError((error) => {
        console.log("Add user failed", error);
        return throwError(() => new Error('Failed to add user'));
      })
    )
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
      catchError((error) => {
        console.log("Get all users failed", error);
        return throwError(() => new Error('Failed to fetch users'));
      })
    );
  }

  getNonDeletedUsers(): Observable<any[]> {
    return this.getAllUsers().pipe(
      map(users => users.filter(user => !user.isDeleted)),
      catchError((error) => {
        console.log("Filtering non-deleted users failed", error);
        return throwError(() => new Error('Failed to fetch active users'));
      })
    );
  }

  getDeletedUsers(): Observable<any[]> {
    return this.getAllUsers().pipe(
      map(users => users.filter(user => user.isDeleted === true)),
      catchError((error) => {
        console.log("Filtering deleted users failed", error);
        return throwError(() => new Error('Failed to fetch deleted users'));
      })
    );
  }

  getUserById(id: string | number): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.log("Get user by ID failed", error);
        return throwError(() => new Error('Failed to fetch user by ID'));
      })
    );
  }

  softDeleteUser(user: any): Observable<any> {
    const updated = { ...user, isDeleted: true };
    return this.http.put(`${this.apiURL}/${user.id}`, updated).pipe(
      catchError((error) => {
        console.log("Soft delete failed", error);
        return throwError(() => new Error('Failed to delete user'));
      })
    );
  }

  restoreUser(user: any): Observable<any> {
    const updated = { ...user, isDeleFFted: false };
    return this.http.put(`${this.apiURL}/${user.id}`, updated).pipe(
      catchError((error) => {
        console.log("Restore failed", error);
        return throwError(() => new Error('Failed to restore user'));
      })
    );
  }

  updateUser(id: number, updatedUser: any): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, updatedUser).pipe(
      catchError((error) => {
        console.error("User update failed", error);
        return throwError(() => new Error('Failed to update user'));
      })
    );
  }

}
