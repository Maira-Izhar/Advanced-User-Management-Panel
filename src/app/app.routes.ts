import { Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { TrashViewComponent } from './user/trash-view/trash-view.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path:'users', component: UserListComponent, canActivate: [authGuard]},
    {path: 'users/edit/:id', canActivate: [authGuard],loadComponent: () =>
    import('./user/edit-user/edit-user.component').then(m => m.EditUserComponent)},
    {path:'users/create', loadComponent:() => 
    import('./user/user-form/user-form.component').then(m => m.UserFormComponent)},
    {path:'users/trash', loadComponent:() => 
    import('./user/trash-view/trash-view.component').then(m => m.TrashViewComponent)},
];
