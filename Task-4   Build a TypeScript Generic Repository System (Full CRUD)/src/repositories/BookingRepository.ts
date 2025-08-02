// repositories/BookingRepository.ts
import { BaseRepository } from '../BaseRepository';
import { Booking } from '../models';

export class BookingRepository extends BaseRepository<Booking> {
  constructor() {
    super([
      { id: '1', userId: '1', courseId: '1', date: '2025-08-01' },
      { id: '2', userId: '2', courseId: '2', date: '2025-08-05' },
    ]);
  }
}
