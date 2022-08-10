import { buildSchema, prop } from '@typegoose/typegoose';

export class Ability {
  // ! REQUIRED
  @prop({ required: true })
  name: string;

  @prop({ default: null })
  description: string;

  @prop({ type: () => String, default: null })
  tags: string[];

  @prop({ type: () => String, default: null })
  questionnaire: string[];

  @prop({ default: null })
  createdBy: string;

  @prop({ default: null })
  updatedBy: string;
}

export const AbilitySchema = buildSchema(Ability);
