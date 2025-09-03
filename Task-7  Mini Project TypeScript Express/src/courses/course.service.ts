import { Repository } from "../shared/repository";
import { Course } from "../types";
import { CustomError } from "../shared/errors";

export class CourseService {
  constructor(private courseRepo: Repository<Course>) {}

  createCourse(data: Omit<Course, "id" | "createdAt" | "updatedAt">): Course {
    const course: Course = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.courseRepo.create(course);
  }

  getAll() {
    return this.courseRepo.findAll();
  }

  getById(id: string) {
    const c = this.courseRepo.findById(id);
    if (!c) throw new CustomError("Course not found", 404);
    return c;
  }

  updateCourse(id: string, userId: string, role: string, data: Partial<Course>) {
    const course = this.getById(id);
    if (role !== "ADMIN" && course.createdBy !== userId) {
      throw new CustomError("Forbidden", 403);
    }
    return this.courseRepo.update(id, data);
  }

  deleteCourse(id: string, userId: string, role: string) {
    const course = this.getById(id);
    if (role !== "ADMIN" && course.createdBy !== userId) {
      throw new CustomError("Forbidden", 403);
    }
    this.courseRepo.delete(id);
  }
}
