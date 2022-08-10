import { buildSchema, ModelOptions, prop } from '@typegoose/typegoose';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Job {
  // ! REQUIRED
  @prop({ required: true })
  name: string;

  @prop({ default: null })
  description: string;

  @prop({ default: null })
  talentPool: string;

  @prop({ default: null })
  createdBy: string;

  @prop({ default: null })
  updatedBy: string;
}

export const JobSchema = buildSchema(Job);
