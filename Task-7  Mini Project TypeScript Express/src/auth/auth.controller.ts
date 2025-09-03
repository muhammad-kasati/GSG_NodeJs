import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { z } from "zod";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      });
      const data = schema.parse(req.body);
      const user = this.authService.register(data.name, data.email, data.password);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  login = (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z.string(),
      });
      const data = schema.parse(req.body);
      const result = this.authService.login(data.email, data.password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}
