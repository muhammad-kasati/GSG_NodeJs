import express from "express";
import bodyParser from "body-parser";
import { AuthService } from "./auth/auth.service";
import authRoutes from "./auth/auth.routes";
import { UserService } from "./users/user.service";
import userRoutes from "./users/user.routes";
import { CourseService } from "./courses/course.service";
import courseRoutes from "./courses/course.routes";
import { errorHandler } from "./shared/middlewares";

const app = express();
app.use(bodyParser.json());

// Services
const authService = new AuthService();
const userService = new UserService();
const courseService = new CourseService();

// Routes
app.use("/auth", authRoutes(authService));
app.use("/users", userRoutes(userService));
app.use("/courses", courseRoutes(courseService));

// Error handler
app.use(errorHandler);

// Fallback
app.use((req, res) => res.status(404).json({ message: "Not Found" }));

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
