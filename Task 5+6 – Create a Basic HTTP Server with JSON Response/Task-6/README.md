# Task 6 – Create a Basic HTTP Server with JSON Response

## 📌 Description
This task demonstrates creating a **basic HTTP server** in Node.js using the built-in `http` module without any external frameworks.  
The server handles multiple routes and returns responses in **JSON format**.

---

## 🚀 Features
- Built with the **native `http` module** (no Express or other frameworks).
- Listens on **port 3000**.
- Handles the following routes:
  - `GET /` → `{ "message": "Welcome to the server" }`
  - `GET /about` → `{ "message": "This is the about route" }`
- Any unknown route → returns `{ "error": "Route not found" }` with a **404** status.
- Sets `Content-Type: application/json` in responses.

---

## 📂 Project Structure
