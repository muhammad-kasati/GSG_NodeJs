import prisma from "../shared/prisma";
import { CustomError } from "../shared/errors";

export class CourseService {
  // إنشاء كورس جديد
  async createCourse(data: { title: string; description: string; coachId: string }) {
    return prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        coachId: data.coachId, // لازم يطابق schema
      },
    });
  }

  // جلب جميع الكورسات
  async getAll() {
    return prisma.course.findMany(); // شلت include: { user: true } لأنه مش موجود
  }

  // جلب كورس بالـ id
  async getById(id: string) {
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) throw new CustomError("Course not found", 404);
    return course;
  }

  // تحديث كورس
  async updateCourse(id: string, role: string, data: { title?: string; description?: string }) {
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) throw new CustomError("Course not found", 404);

    if (role !== "ADMIN") {
      throw new CustomError("Forbidden", 403);
    }

    return prisma.course.update({
      where: { id },
      data,
    });
  }

  // حذف كورس
  async deleteCourse(id: string, role: string) {
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) throw new CustomError("Course not found", 404);

    if (role !== "ADMIN") {
      throw new CustomError("Forbidden", 403);
    }

    return prisma.course.delete({ where: { id } });
  }
}
