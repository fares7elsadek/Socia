import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from '../../users/models/user.model.js';


@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field({ description: 'The post content/text' })
  content: string;

  @Field(() => Int, { description: 'Number of likes' })
  likesCount: number;

  authorId: string;

  @Field(() => User, { description: 'The user who created this post' })
  author: User;

  @Field()
  createdAt: Date;
}
