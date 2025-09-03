# Mini TypeScript Express API

A small Express API built in TypeScript using a modular architecture with **auth**, **users**, and **courses** modules.  
Supports JWT authentication, role-based access (ADMIN / COACH / STUDENT), user profile management, and course CRUD operations.  
All data is stored in **in-memory objects** (reset on server restart).  

---

## Table of Contents

1. [Project Structure](#project-structure)  
2. [Setup & Run](#setup--run)  
3. [Seed Data](#seed-data)  
4. [Routes / Endpoints](#routes--endpoints)  
5. [Roles & Permissions](#roles--permissions)  
6. [Error Handling](#error-handling)  

---

## Project Structure

```
src/
 ├── auth/            # Authentication module (register, login, JWT)
 ├── users/           # User module (profile read/update)
 ├── courses/         # Course module (CRUD)
 ├── shared/          # Common utils, middlewares, repository, error handling
 └── server.ts        # App entry point
```

---

## Setup & Run

1. Clone / download the project  
2. Install dependencies:
```bash
npm install
```
3. Run the server (development mode):
```bash
npm run dev
```
Server will run on `http://localhost:3000`

---

## Seed Data

Every time the server starts, there is a default admin:

```
email: admin@no.com
password: admin123
role: ADMIN
```

---

## Routes / Endpoints

### Auth
| Method | URL | Headers | Body | Role | Description |
|--------|-----|---------|------|------|-------------|
| POST | /auth/register | Content-Type: application/json | `{ "name": "John", "email": "john@example.com", "password": "secret123" }` | Anyone | Register new user (STUDENT by default) |
| POST | /auth/login | Content-Type: application/json | `{ "email": "admin@no.com", "password": "admin123" }` | Anyone | Login and get JWT token |

### Users
| Method | URL | Headers | Body | Role | Description |
|--------|-----|---------|------|------|-------------|
| GET | /users/me | Authorization: Bearer `<token>` | – | Any logged-in user | Get current user profile |
| PUT | /users/me | Authorization: Bearer `<token>`<br>Content-Type: application/json | `{ "name": "New Name", "password": "newpass123" }` | Any logged-in user | Update current user profile |
| POST | /users/coach | Authorization: Bearer `<admin_token>`<br>Content-Type: application/json | `{ "name": "Coach Name", "email": "coach@example.com", "password": "coachpass" }` | ADMIN only | Create a COACH user |

### Courses
| Method | URL | Headers | Body | Role | Description |
|--------|-----|---------|------|------|-------------|
| POST | /courses | Authorization: Bearer `<token>`<br>Content-Type: application/json | `{ "title": "React Basics", "description": "Learn React", "image": "url" }` | ADMIN / COACH | Create new course |
| GET | /courses | – | – | Any | Get all courses |
| GET | /courses/:id | – | – | Any | Get course by ID |
| PUT | /courses/:id | Authorization: Bearer `<token>`<br>Content-Type: application/json | `{ "title": "Updated Title" }` | ADMIN / Course creator (COACH) | Update course |
| DELETE | /courses/:id | Authorization: Bearer `<token>` | – | ADMIN / Course creator (COACH) | Delete course |

---

## Roles & Permissions

- **ADMIN**
  - Can create COACH users  
  - Can update/delete any course  
- **COACH**
  - Can create/update/delete their own courses  
- **STUDENT**
  - Default role when registering  
  - Can only view courses  

---

## Error Handling

| Status | Description |
|--------|------------|
| 400 | Validation errors (Zod) |
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden (wrong role) |
| 404 | Resource not found |
| 500 | Internal server error |

---

## Notes

- All data is **in-memory**: resets on server restart.  
- Use **Authorization: Bearer `<token>`** header for all protected routes.  
- Use **Content-Type: application/json** for all POST/PUT requests.  

