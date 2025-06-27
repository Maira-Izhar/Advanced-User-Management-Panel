# Advanced User Management Panel (Angular + Bootstrap)

A complete **CRUD application** built with **Angular** and styled using **Bootstrap**, this project demonstrates role-based user management with soft delete functionality and form validation using reactive forms.

## Features

- **User Login and authentication**
- **Role-Based Access Control**
  - `Admin`: Can create, update, delete (soft delete), and view users
  - `Viewer`: Can only view users
-  **Edit and Update User Profiles**
- **Soft Delete Functionality**
  - Deleted users are moved to a **Trash View** and can be restored by admin
-  **User Search and Filtering**
- **Reactive Forms with Validation**
- **Clean UI using Bootstrap and Material Angular for paginated table**
- ** REST API using JSON Server**


## How to Run

```bash
# Start json-server
npx json-server --watch db.json --port 3000

# Run Angular app
ng serve
```

## Tech Stack

- **Frontend**: Angular 17+, TypeScript, Bootstrap 5
- **Backend**: JSON Server (for local REST API simulation)


