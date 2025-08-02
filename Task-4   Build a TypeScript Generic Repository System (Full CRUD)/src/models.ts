// models.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
}

export interface Booking {
  id: string;
  userId: string;
  courseId: string;
  date: string;
}
