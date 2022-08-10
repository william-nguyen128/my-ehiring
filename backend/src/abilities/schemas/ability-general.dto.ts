import { IsNotEmpty } from 'class-validator';

export class AbilityGeneralDto {
  // ! REQUIRED
  @IsNotEmpty()
  name!: string;

  description?: string;

  tags?: string[];

  questionnaire?: string[];

  createdBy?: string;

  updatedBy?: string;
}
