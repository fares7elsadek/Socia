import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { User } from './models/user.model.js';
import { UsersService } from './users.service.js';
import { CreateUserInput } from './dto/create-user.input.js';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}


  @Query(() => [User], { name: 'users', description: 'Get all users' })
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user', description: 'Get a user by ID' })
  findOne(@Args('id', { type: () => ID }) id: string): User {
    return this.usersService.findOne(id);
  }


  @Mutation(() => User, { description: 'Create a new user' })
  createUser(@Args('input') input: CreateUserInput): User {
    return this.usersService.create(input);
  }
}
