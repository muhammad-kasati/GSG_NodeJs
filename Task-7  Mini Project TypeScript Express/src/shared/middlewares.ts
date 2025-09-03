import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "./errors";
import { Role } from "../types";

const SECRET = "SECRET_KEY";

export const authMiddleware = (roles?: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    if (!header) throw new CustomError("Unauthorized", 401);

    try {
      const token = header.split(" ")[1];
      const payload = jwt.verify(token, SECRET) as any;
      (req as any).user = payload;
      if (roles && !roles.includes(payload.role)) {
        throw new CustomError("Forbidden", 403);
      }
      next();
    } catch {
      throw new CustomError("Unauthorized", 401);
    }
  };
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Server Error" });
};

export { SECRET };
