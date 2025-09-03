import { Router } from "express";
import { authMiddleware } from "../shared/middlewares";
import { UserService } from "./user.service";
import { z } from "zod";

const router = Router();

export default (userService: UserService) => {
  router.get("/me", authMiddleware(), (req, res, next) => {
    try {
      const user = userService.getMe((req as any).user.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

  router.put("/me", authMiddleware(), (req, res, next) => {
    try {
      const schema = z.object({ name: z.string().optional(), password: z.string().optional() });
      const data = schema.parse(req.body);
      const user = userService.updateMe((req as any).user.id, data);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

  router.post("/coach", authMiddleware(["ADMIN"]), (req, res, next) => {
    try {
      const schema = z.object({ name: z.string(), email: z.string().email(), password: z.string().min(6) });
      const data = schema.parse(req.body);
      const coach = userService.createCoach(data.name, data.email, data.password);
      res.json(coach);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
