# Project Description – Advanced User Management Panel

## Goals
This project is a **feature-rich CRUD application** built using Angular to demonstrate mastery of the core Angular concepts, design patterns, and best practices. It emphasizes clean architecture, modularization, reusable components, and a great user experience. The project also showcases **role-based access control (RBAC)** and **soft deletion logic** to mimic real-world administrative interfaces.

---

## Features

### User List with Table
- Displays all users in a **paginated, searchable, and filterable table**.
- Utilizes an external Angular table library for performance and advanced UI controls.
- Users can search by name/email and filter by role or status (Active/Deleted).

### Add New Users
- A **multi-step reactive form** collects user data in logical steps (e.g., personal info → account info).
- Form includes:
  - Field-level validation (required, pattern, email, etc.)
  - Step-level validation enforcement
  - Error messages shown clearly and consistently
- Uses Angular Reactive Forms and FormBuilder for structure and validation.

### Edit Users
- Edit existing users via a pre-filled reactive form.
- Role-based restriction applies: Only Admins can edit users.

### Soft Delete & Trash View
- Implements **soft delete**: deleted users are not removed from the backend but flagged and moved to a **Trash View**.
- Trash View allows:
  - Viewing soft-deleted users
  - **Restoring** users with a single action (Admins only)

### Role-Based Access Control (RBAC)
- Two user roles:
  - **Admin**: Full access – Create, Read, Update, Soft Delete, Restore
  - **Viewer**: Read-only – Can view the user list and edit/delete only their own account
- RBAC logic is enforced at both UI and routing level.

### Backend Integration
- Integrated with a **mock backend using `json-server`**.
- Supports all CRUD operations:
  - `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- Data flow handled using **services and RxJS observables** to ensure consistency and reactivity across the app.

---

## Technical Concepts Used

- Angular CLI & Project Structure
- Routing & Lazy Loading
- Services & Dependency Injection
- Reactive Forms & Form Groups
- Custom Pipes & Validators
- Guards (Auth, Role)
- HTTP Client with Observables
- Environment-based configurations
- JSON-Server for REST API mocking
- Third-party component libraries for table and form UI
- Global error handling & validation UX

---

## Code Quality & UX Focus

- Clean and modular folder structure
- Consistent naming conventions
- Reusable shared components (e.g., input fields, confirmation dialogs)
- Mobile-responsive layout
- Real-time user feedback via toasts/snackbars (e.g., on save/delete)
- Form accessibility and intuitive UI

---

## Outcome
This project demonstrates a robust, scalable Angular architecture ideal for enterprise-level apps. It integrates complex UI features, clean design, and critical security patterns like RBAC—all connected through a fully working CRUD API.
