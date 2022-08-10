import { IsNotEmpty } from 'class-validator';

export class JobGeneralDto {
  // ! REQUIRED
  @IsNotEmpty()
  name!: string;

  description?: string;

  talentPool?: string;

  createdBy?: string;

  updatedBy?: string;
}
