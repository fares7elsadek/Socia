import { InputType, Field } from '@nestjs/graphql';


@InputType()
export class CreatePostInput {
  @Field({ description: 'The text content of the post' })
  content: string;

  @Field({ description: 'The ID of the user creating the post' })
  authorId: string;
}
