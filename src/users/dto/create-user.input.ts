import { InputType, Field } from '@nestjs/graphql';

/**
 * Input for creating a new user.
 *
 * @InputType() — this is a GraphQL "input" type, used for mutation arguments.
 * Think of it as the "request body" equivalent in REST.
 */
@InputType()
export class CreateUserInput {
  @Field({ description: 'Unique username' })
  username: string;

  @Field({ description: 'User email address' })
  email: string;

  @Field({ nullable: true, description: 'Optional bio' })
  bio?: string;
}
