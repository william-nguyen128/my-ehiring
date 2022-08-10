import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  ValidateNested,
} from 'class-validator';

class Location {
  address?: string;

  postalCode?: string;

  city?: string;

  countryCode?: string;

  region?: string;
}

class Profile {
  network?: string;

  username?: string;

  @IsOptional()
  @IsUrl()
  url?: string;
}

class Basics {
  // ! REQUIRED
  @IsNotEmpty()
  name!: string;

  gender?: string;

  dob?: string;

  label?: string;

  @IsOptional()
  image?: string;

  // ! REQUIRED
  @IsEmail()
  email!: string;

  // ! REQUIRED
  @IsPhoneNumber()
  phone!: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  summary?: string;

  location?: Location;

  @ValidateNested({ each: true })
  @Type(() => Profile)
  profiles?: Profile[];
}

class Work {
  name?: string;

  position?: string;

  location?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  startDate?: string;

  endDate?: string;

  summary?: string;

  highlights?: string[];
}

class Volunteer {
  organization?: string;

  position?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  startDate?: string;

  endDate?: string;

  summary?: string;

  highlights?: string[];
}

class Education {
  insititution?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  area?: string;

  studyType?: string;

  startDate?: string;

  endDate?: string;

  score?: string;

  courses?: string[];
}

class Award {
  title?: string;

  date?: string;

  awarder?: string;

  summary?: string;
}

class Certificate {
  name?: string;

  date?: string;

  issuer?: string;

  @IsOptional()
  @IsUrl()
  url?: string;
}

class Publication {
  name?: string;

  publisher?: string;

  releaseDate?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  summary?: string;
}

class Skill {
  name?: string;

  level?: string;

  keywords?: string[];
}

class Language {
  language?: string;

  fluency?: string;
}

class Interest {
  name?: string;

  keywords?: string[];
}

class Reference {
  name?: string;

  reference?: string;
}

class Project {
  name?: string;

  description?: string;

  highlights?: string[];

  keywords?: string[];

  startDate?: string;

  endDate?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  roles?: string[];

  entity?: string;

  type?: string;
}

class Rating {
  userId?: string;

  isRecommending?: boolean;

  rating?: number;
}

class FinalRating {
  avgRating?: number;

  recommended?: number;
}

export class TalentGeneralDto {
  // ! REQUIRED
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Basics)
  basics!: Basics;

  @ValidateNested({ each: true })
  @Type(() => Work)
  works?: Work[];

  @ValidateNested({ each: true })
  @Type(() => Volunteer)
  volunteers?: Volunteer[];

  @ValidateNested({ each: true })
  @Type(() => Education)
  educations?: Education[];

  @ValidateNested({ each: true })
  @Type(() => Award)
  awards?: Award[];

  @ValidateNested({ each: true })
  @Type(() => Certificate)
  certificates?: Certificate[];

  @ValidateNested({ each: true })
  @Type(() => Publication)
  publications?: Publication[];

  @ValidateNested({ each: true })
  @Type(() => Skill)
  skills?: Skill[];

  @ValidateNested({ each: true })
  @Type(() => Language)
  languages?: Language[];

  @ValidateNested({ each: true })
  @Type(() => Interest)
  interests?: Interest[];

  @ValidateNested({ each: true })
  @Type(() => Reference)
  references?: Reference[];

  @ValidateNested({ each: true })
  @Type(() => Project)
  projects?: Project[];

  talentPools?: string[];

  isFavorite?: boolean;

  hashTags?: string[];

  @IsNotEmpty()
  job?: string;

  ratings?: Rating[];

  finalRating?: FinalRating;

  source?: string;

  campaign?: string;

  applyDate?: string;

  interviewDate?: string;

  status?: string;

  mailTracking?: string;

  createdBy?: string;

  updatedBy?: string;
}
