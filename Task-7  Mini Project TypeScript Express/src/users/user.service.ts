import { Repository } from "../shared/repository";
import { User } from "../types";
import { CustomError } from "../shared/errors";
import bcrypt from "bcryptjs";

export class UserService {
  constructor(private userRepo: Repository<User>) {}

  getMe(userId: string) {
    const user = this.userRepo.findById(userId);
    if (!user) throw new CustomError("User not found", 404);
    return user;
  }

  updateMe(userId: string, data: Partial<User>) {
    if (data.password) data.password = bcrypt.hashSync(data.password, 8);
    return this.userRepo.update(userId, data);
  }

  createCoach(name: string, email: string, password: string) {
    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      role: "COACH",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.userRepo.create(user);
  }
}
