import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePetInput {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => Int)
  ownerId: number;
}
