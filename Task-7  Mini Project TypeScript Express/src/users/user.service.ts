import prisma from "../shared/prisma";
import bcrypt from "bcryptjs";
import { CustomError } from "../shared/errors";

export class UserService {
  async getMe(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new CustomError("User not found", 404);
    return user;
  }

  async updateMe(userId: string, data: { name?: string; password?: string }) {
    const updateData: any = { ...data };
    if (data.password) {
      updateData.password = bcrypt.hashSync(data.password, 8);
    }

    return prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  async createCoach(name: string, email: string, password: string) {
    const hashed = bcrypt.hashSync(password, 8);

    return prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: "COACH",
      },
    });
  }

  async getAllUsers() {
    return prisma.user.findMany();
  }
}
