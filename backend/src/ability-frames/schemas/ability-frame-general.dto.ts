import { IsNotEmpty } from 'class-validator';

export class AbilityFrameGeneralDto {
  // ! REQUIRED
  @IsNotEmpty()
  name!: string;

  description?: string;

  abilities?: string[];

  createdBy?: string;

  updatedBy?: string;
}
