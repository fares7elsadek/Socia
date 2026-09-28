import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver.js';
import { PostsService } from './posts.service.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [UsersModule], 
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
