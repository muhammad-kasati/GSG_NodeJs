import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { z } from "zod";

export class UserController {
  constructor(private userService: UserService) {}

  getMe = (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = this.userService.getMe((req as any).user.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  updateMe = (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = z.object({
        name: z.string().optional(),
        password: z.string().optional(),
      });
      const data = schema.parse(req.body);
      const user = this.userService.updateMe((req as any).user.id, data);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  createCoach = (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      });
      const data = schema.parse(req.body);
      const coach = this.userService.createCoach(data.name, data.email, data.password);
      res.json(coach);
    } catch (err) {
      next(err);
    }
  };
}
