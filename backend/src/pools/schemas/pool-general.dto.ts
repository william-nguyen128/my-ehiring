import { IsNotEmpty } from 'class-validator';

export class PoolGeneralDto {
  // ! REQUIRED
  @IsNotEmpty()
  name!: string;

  code?: string;

  manager?: string[];

  description?: string;

  talents?: string[];

  jobs?: string[];

  createdBy?: string;

  updatedBy?: string;
}
