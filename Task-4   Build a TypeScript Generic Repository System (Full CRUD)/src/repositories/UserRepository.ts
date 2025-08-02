// repositories/UserRepository.ts
import { BaseRepository } from '../BaseRepository';
import { User } from '../models';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super([
      { id: '1', name: 'Mohamed', email: 'mohamed@example.com' },
      { id: '2', name: 'Lina', email: 'lina@example.com' },
    ]);
  }
}
