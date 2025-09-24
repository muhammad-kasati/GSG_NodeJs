import prisma from "../shared/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET } from "../shared/middlewares";
import { CustomError } from "../shared/errors";

export class AuthService {
  async register(
    name: string,
    email: string,
    password: string,
    role: "STUDENT" | "COACH" | "ADMIN" = "STUDENT"
  ) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new CustomError("Email already in use", 400);

    const hashed = bcrypt.hashSync(password, 8);

    return prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
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
