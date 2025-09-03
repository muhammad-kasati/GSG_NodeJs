import { Request, Response, NextFunction } from "express";
import { CourseService } from "./course.service";
import { z } from "zod";

export class CourseController {
  constructor(private courseService: CourseService) {}

  createCourse = (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
      });
      const data = schema.parse(req.body);
      const user = (req as any).user;
      const course = this.courseService.createCourse({ ...data, createdBy: user.id });
      res.json(course);
    } catch (err) {
      next(err);
    }
  };

  getAll = (req: Request, res: Response) => {
    res.json(this.courseService.getAll());
  };

  getById = (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = this.courseService.getById(req.params.id);
      res.json(course);
    } catch (err) {
      next(err);
    }
  };

  updateCourse = (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      });
      const data = schema.parse(req.body);
      const user = (req as any).user;
      const updated = this.courseService.updateCourse(req.params.id, user.id, user.role, data);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  deleteCourse = (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      this.courseService.deleteCourse(req.params.id, user.id, user.role);
      res.json({ message: "Deleted" });
    } catch (err) {
      next(err);
    }
  };
}
