// test.ts
import { UserRepository } from './repositories/UserRepository';
import { CourseRepository } from './repositories/CourseRepository';
import { BookingRepository } from './repositories/BookingRepository';

async function testRepositories() {
  const userRepo = new UserRepository();
  const courseRepo = new CourseRepository();
  const bookingRepo = new BookingRepository();

  console.log('All users:', await userRepo.getAll());
  console.log('User by ID:', await userRepo.getById('1'));
  console.log('Find user by name:', await userRepo.find({ name: 'Lina' }));

  const newUser = await userRepo.create({ id: '3', name: 'Ahmed', email: 'ahmed@example.com' });
  console.log('Created user:', newUser);

  const updatedUser = await userRepo.update('1', { name: 'Mohamed K.' });
  console.log('Updated user:', updatedUser);

  const deleted = await userRepo.delete('2');
  console.log('Deleted user with ID 2:', deleted);

  console.log('Courses:', await courseRepo.getAll());
  console.log('Bookings:', await bookingRepo.getAll());
}

testRepositories();
