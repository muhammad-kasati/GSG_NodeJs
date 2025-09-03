import express from "express";
import bodyParser from "body-parser";
import { Repository } from "./shared/repository";
import { User, Course } from "./types";
import { AuthService } from "./auth/auth.service";
import authRoutes from "./auth/auth.routes";
import { UserService } from "./users/user.service";
import userRoutes from "./users/user.routes";
import { CourseService } from "./courses/course.service";
import courseRoutes from "./courses/course.routes";
import { errorHandler } from "./shared/middlewares";

const app = express();
app.use(bodyParser.json());

// In-memory repositories
const userRepo = new Repository<User>();
const courseRepo = new Repository<Course>();

// Add default admin
const authService = new AuthService(userRepo);
authService.register("Admin", "admin@no.com", "admin123", "ADMIN");

const userService = new UserService(userRepo);
const courseService = new CourseService(courseRepo);

// Routes
app.use("/auth", authRoutes(authService));
app.use("/users", userRoutes(userService));
app.use("/courses", courseRoutes(courseService));

// Error handler
app.use(errorHandler);

// Fallback
app.use((req, res) => res.status(404).json({ message: "Not Found" }));

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
