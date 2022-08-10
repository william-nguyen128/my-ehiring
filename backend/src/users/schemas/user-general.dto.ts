import { IsNotEmpty } from 'class-validator';

export class UserGeneralDto {
  // ! REQUIRED
  @IsNotEmpty()
  username!: string;

  createdBy?: string;

  updatedBy?: string;
}
