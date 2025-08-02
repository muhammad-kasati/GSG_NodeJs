// repositories/CourseRepository.ts
import { BaseRepository } from '../BaseRepository';
import { Course } from '../models';

export class CourseRepository extends BaseRepository<Course> {
  constructor() {
    super([
      { id: '1', title: 'TypeScript 101', description: 'Learn TypeScript basics' },
      { id: '2', title: 'React Basics', description: 'Get started with React' },
    ]);
  }
}
