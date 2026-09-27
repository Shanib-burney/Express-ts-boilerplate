import { randomUUID } from 'crypto';
import { ApiError } from '../utils/ApiError';
import { CreateUserInput, UpdateUserInput } from '../validations/user.validation';

export interface User extends CreateUserInput {
  id: string;
}

// In-memory store — swap for a real database in a real project.
const users = new Map<string, User>();

export const userService = {
  list(): User[] {
    return Array.from(users.values());
  },

  getById(id: string): User {
    const user = users.get(id);
    if (!user) throw ApiError.notFound(`User ${id} not found`);
    return user;
  },

  create(input: CreateUserInput): User {
    const user: User = { id: randomUUID(), ...input };
    users.set(user.id, user);
    return user;
  },

  update(id: string, input: UpdateUserInput): User {
    const existing = this.getById(id);
    const updated = { ...existing, ...input };
    users.set(id, updated);
    return updated;
  },

  remove(id: string): void {
    this.getById(id);
    users.delete(id);
  },
};
