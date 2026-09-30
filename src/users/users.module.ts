import { Module } from '@nestjs/common';
import { UsersResolver } from './controllers/users.resolver.js';
import { UsersService } from './services/users.service.js';


@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
