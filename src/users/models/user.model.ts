import { ObjectType, Field, ID } from '@nestjs/graphql';

/**
 * User entity for the social media app.
 *
 * @ObjectType() — registers this class as a GraphQL type
 * @Field()     — exposes each property in the GraphQL schema
 */
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true, description: 'Short bio about the user' })
  bio?: string;

  @Field()
  createdAt: Date;
}
