import { buildSchema, ModelOptions, prop } from '@typegoose/typegoose';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class User {
  // ! REQUIRED
  @prop({ required: true })
  username: string;

  @prop({ default: null })
  createdBy: string;

  @prop({ default: null })
  updatedBy: string;
}

export const UserSchema = buildSchema(User);
