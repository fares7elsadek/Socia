import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './models/post.model.js';
import { CreatePostInput } from './dto/create-post.input.js';
import { randomUUID } from 'node:crypto';


@Injectable()
export class PostsService {
  private readonly posts = new Map<string, Post>();

 
  create(input: CreatePostInput): Post {
    const post: Post = {
      id: randomUUID(),
      content: input.content,
      authorId: input.authorId,
      author: undefined!, 
      likesCount: 0,
      createdAt: new Date(),
    };

    this.posts.set(post.id, post);
    return post;
  }

 
  findAll(): Post[] {
    return [...this.posts.values()];
  }

  findOne(id: string): Post {
    const post = this.posts.get(id);
    if (!post) {
      throw new NotFoundException(`Post with id "${id}" not found`);
    }
    return post;
  }

  
  findByAuthor(authorId: string): Post[] {
    return [...this.posts.values()].filter((p) => p.authorId === authorId);
  }

 
  likePost(id: string): Post {
    const post = this.findOne(id);
    post.likesCount += 1;
    return post;
  }
}
