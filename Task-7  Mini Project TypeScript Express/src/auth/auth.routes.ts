import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export default (authService: AuthService) => {
  const router = Router();
  const controller = new AuthController(authService);

  router.post("/register", controller.register);
  router.post("/login", controller.login);

  return router;
};
