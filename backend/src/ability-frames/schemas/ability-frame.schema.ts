import { buildSchema, prop } from '@typegoose/typegoose';

export class AbilityFrame {
  // ! REQUIRED
  @prop({ required: true })
  name: string;

  @prop({ default: null })
  description: string;

  @prop({ type: () => String, default: null })
  abilities: string[];

  @prop({ default: null })
  createdBy: string;

  @prop({ default: null })
  updatedBy: string;
}

export const AbilityFrameSchema = buildSchema(AbilityFrame);
