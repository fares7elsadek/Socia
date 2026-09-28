import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Post } from './models/post.model.js';
import { PostsService } from './posts.service.js';
import { CreatePostInput } from './dto/create-post.input.js';
import { UsersService } from '../users/users.service.js';
import { User } from '../users/models/user.model.js';


@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  // ─── Queries ───────────────────────────────────────────────

  /**
   * Get all posts.
   * GraphQL: query { posts { id content author { username } } }
   */
  @Query(() => [Post], { name: 'posts', description: 'Get all posts' })
  findAll(): Post[] {
    return this.postsService.findAll();
  }

  /**
   * Get a single post by ID.
   * GraphQL: query { post(id: "...") { id content likesCount } }
   */
  @Query(() => Post, { name: 'post', description: 'Get a post by ID' })
  findOne(@Args('id', { type: () => ID }) id: string): Post {
    return this.postsService.findOne(id);
  }

  // ─── Mutations ─────────────────────────────────────────────

  /**
   * Create a new post.
   * GraphQL: mutation { createPost(input: { content: "Hello!", authorId: "..." }) { id } }
   */
  @Mutation(() => Post, { description: 'Create a new post' })
  createPost(@Args('input') input: CreatePostInput): Post {
    // Verify the author exists before creating the post
    this.usersService.findOne(input.authorId);
    return this.postsService.create(input);
  }

  /**
   * Like a post (increment the likes counter).
   * GraphQL: mutation { likePost(id: "...") { id likesCount } }
   */
  @Mutation(() => Post, { description: 'Like a post' })
  likePost(@Args('id', { type: () => ID }) id: string): Post {
    return this.postsService.likePost(id);
  }

  // ─── Field Resolvers ──────────────────────────────────────

  /**
   * Resolve the "author" field on a Post.
   *
   * @ResolveField is a key GraphQL concept:
   * - The post only stores `authorId`
   * - When the client asks for `post { author { username } }`,
   *   GraphQL calls THIS method to fetch the full User object
   * - If the client doesn't ask for `author`, this never runs! (efficiency!)
   */
  @ResolveField('author', () => User)
  getAuthor(@Parent() post: Post): User {
    return this.usersService.findOne(post.authorId);
  }
}
