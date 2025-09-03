import { Repository } from "../shared/repository";
import { User } from "../types";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET } from "../shared/middlewares";
import { CustomError } from "../shared/errors";

export class AuthService {
  constructor(private userRepo: Repository<User>) {}

  register(name: string, email: string, password: string, role: "STUDENT" | "COACH" | "ADMIN" = "STUDENT") {
    if (this.userRepo.findAll().some(u => u.email === email)) {
      throw new CustomError("Email already in use", 400);
    }

    const user: User = {
      id: uuid(),
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.userRepo.create(user);
  }

  login(email: string, password: string) {
    const user = this.userRepo.findAll().find(u => u.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new CustomError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      SECRET,
      { expiresIn: "1h" }
    );

    return { token, user };
  }
}
