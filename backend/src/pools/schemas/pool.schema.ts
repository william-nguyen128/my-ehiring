import { buildSchema, ModelOptions, prop } from '@typegoose/typegoose';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Pool {
  // ! REQUIRED
  @prop({ required: true })
  name: string;

  @prop({ default: null })
  code: string;

  @prop({ default: null, type: () => String })
  manager: string[];

  @prop({ default: null })
  description: string;

  // Talents' ID
  @prop({ default: null, type: () => String })
  talents: string[];

  // Jobs' ID
  @prop({ default: null, type: () => String })
  jobs: string[];

  @prop({ default: null })
  createdBy: string;

  @prop({ default: null })
  updatedBy: string;
}

export const PoolSchema = buildSchema(Pool);
