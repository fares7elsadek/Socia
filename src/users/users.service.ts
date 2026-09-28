import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/user.model.js';
import { CreateUserInput } from './dto/create-user.input.js';
import { randomUUID } from 'node:crypto';


@Injectable()
export class UsersService {
  private readonly users = new Map<string, User>();

  
  create(input: CreateUserInput): User {
    const user: User = {
      id: randomUUID(),
      username: input.username,
      email: input.email,
      bio: input.bio,
      createdAt: new Date(),
    };

    this.users.set(user.id, user);
    return user;
  }


  findAll(): User[] {
    return [...this.users.values()];
  }


  findOne(id: string): User {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
    return user;
  }
}
