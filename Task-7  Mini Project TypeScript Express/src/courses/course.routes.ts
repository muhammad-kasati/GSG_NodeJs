import { Router } from "express";
import { authMiddleware } from "../shared/middlewares";
import { CourseService } from "./course.service";
import { z } from "zod";

const router = Router();

export default (courseService: CourseService) => {
  router.post("/", authMiddleware(["ADMIN", "COACH"]), (req, res, next) => {
    try {
      const schema = z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
      });
      const data = schema.parse(req.body);
      const user = (req as any).user;
      const course = courseService.createCourse({ ...data, createdBy: user.id });
      res.json(course);
    } catch (err) {
      next(err);
    }
  });

  router.get("/", (req, res) => {
    res.json(courseService.getAll());
  });

  router.get("/:id", (req, res, next) => {
    try {
      res.json(courseService.getById(req.params.id));
    } catch (err) {
      next(err);
    }
  });

  router.put("/:id", authMiddleware(["ADMIN", "COACH"]), (req, res, next) => {
    try {
      const schema = z.object({ title: z.string().optional(), description: z.string().optional() });
      const data = schema.parse(req.body);
      const user = (req as any).user;
      const updated = courseService.updateCourse(req.params.id, user.id, user.role, data);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", authMiddleware(["ADMIN", "COACH"]), (req, res, next) => {
    try {
      const user = (req as any).user;
      courseService.deleteCourse(req.params.id, user.id, user.role);
      res.json({ message: "Deleted" });
    } catch (err) {
      next(err);
    }
  });

  return router;
};
