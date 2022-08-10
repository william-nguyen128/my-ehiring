import { buildSchema, modelOptions, plugin, prop } from '@typegoose/typegoose';
import * as paginate from 'mongoose-paginate-v2';

class Location {
  @prop({ default: null })
  address: string;

  @prop({ default: null })
  postalCode: string;

  @prop({ default: null })
  city: string;

  @prop({ default: null })
  countryCode: string;

  @prop({ default: null })
  region: string;
}

class Profile {
  @prop({ default: null })
  network: string;

  @prop({ default: null })
  username: string;

  @prop({ default: null })
  url: string;
}

class Basics {
  // ! REQUIRED
  @prop({ required: true })
  name: string;

  @prop({ default: 'Other' })
  gender: string;

  @prop({ default: Date.now })
  dob: string;

  @prop({ default: null })
  label: string;

  @prop({ default: null })
  image: string;

  // ! REQUIRED
  @prop({ required: true })
  email: string;

  // ! REQUIRED
  @prop({ required: true })
  phone: string;

  @prop({ default: null })
  url: string;

  @prop({ default: null })
  summary: string;

  @prop({ default: {} })
  location: Location;

  @prop({ default: [], type: () => Profile })
  profiles: Profile[];
}

class Work {
  @prop({ default: null })
  name: string;

  @prop({ default: null })
  position: string;

  @prop({ default: null })
  location: string;

  @prop({ default: null })
  url: string;

  @prop({ default: null })
  startDate: string;

  @prop({ default: null })
  endDate: string;

  @prop({ default: null })
  summary: string;

  @prop({ default: null, type: () => String })
  highlights: string[];
}

class Volunteer {
  @prop({ default: null })
  organization: string;

  @prop({ default: null })
  position: string;

  @prop({ default: null })
  url: string;

  @prop({ default: null })
  startDate: string;

  @prop({ default: null })
  endDate: string;

  @prop({ default: null })
  summary: string;

  @prop({ default: null, type: () => String })
  highlights: string[];
}

class Education {
  @prop({ default: null })
  insititution: string;

  @prop({ default: null })
  url: string;

  @prop({ default: null })
  area: string;

  @prop({ default: null })
  studyType: string;

  @prop({ default: null })
  startDate: string;

  @prop({ default: null })
  endDate: string;

  @prop({ default: null })
  score: string;

  @prop({ default: null, type: () => String })
  courses: string[];
}

class Award {
  @prop({ default: null })
  title: string;

  @prop({ default: null })
  date: string;

  @prop({ default: null })
  awarder: string;

  @prop({ default: null })
  summary: string;
}

class Certificate {
  @prop({ default: null })
  name: string;

  @prop({ default: null })
  date: string;

  @prop({ default: null })
  issuer: string;

  @prop({ default: null })
  url: string;
}

class Publication {
  @prop({ default: null })
  name: string;

  @prop({ default: null })
  publisher: string;

  @prop({ default: null })
  releaseDate: string;

  @prop({ default: null })
  url: string;

  @prop({ default: null })
  summary: string;
}

class Skill {
  @prop({ default: null })
  name: string;

  @prop({ default: null })
  level: string;

  @prop({ default: null, type: () => String })
  keywords: string[];
}

class Language {
  @prop({ default: null })
  language: string;

  @prop({ default: null })
  fluency: string;
}

class Interest {
  @prop({ default: null })
  name: string;

  @prop({ default: null, type: () => String })
  keywords: string[];
}

class Reference {
  @prop({ default: null })
  name: string;

  @prop({ default: null })
  reference: string;
}

class Project {
  @prop({ default: null })
  name: string;

  @prop({ default: null })
  description: string;

  @prop({ default: null, type: () => String })
  highlights: string[];

  @prop({ default: null, type: () => String })
  keywords: string[];

  @prop({ default: null })
  startDate: string;

  @prop({ default: null })
  endDate: string;

  @prop({ default: null, type: () => String })
  url: string;

  @prop({ default: null, type: () => String })
  roles: string[];

  @prop({ default: null })
  entity: string;

  @prop({ default: null })
  type: string;
}

class Rating {
  @prop({ default: null })
  userId: string;

  @prop({ default: true })
  isRecommending: boolean;

  @prop({ default: 0 })
  rating: number;
}

class FinalRating {
  @prop({ default: 0 })
  avgRating: number;

  @prop({ default: 0 })
  recommended: number;
}

@plugin(paginate)
@modelOptions({ schemaOptions: { timestamps: true } })
export class Talent {
  // ! REQUIRED
  @prop({ type: () => Basics })
  basics: Basics;

  @prop({ default: null, type: () => Work })
  works: Work[];

  @prop({ default: null, type: () => Volunteer })
  volunteers: Volunteer[];

  @prop({ default: null, type: () => Education })
  educations: Education[];

  @prop({ default: null, type: () => Award })
  awards: Award[];

  @prop({ default: null, type: () => Certificate })
  certificates: Certificate[];

  @prop({ default: null, type: () => Publication })
  publications: Publication[];

  @prop({ default: null, type: () => Skill })
  skills: Skill[];

  @prop({ default: null, type: () => Language })
  languages: Language[];

  @prop({ default: null, type: () => Interest })
  interests: Interest[];

  @prop({ default: null, type: () => Reference })
  references: Reference[];

  @prop({ default: null, type: () => Project })
  projects: Project[];

  @prop({ type: () => String })
  talentPools: string[];

  @prop({ default: false })
  isFavorite: boolean;

  @prop({ default: null, type: () => String })
  hashTags: string[];

  @prop({ default: null })
  job: string;

  @prop({ default: null, type: () => Rating })
  ratings: Rating[];

  @prop({ default: null, type: () => FinalRating })
  finalRating: FinalRating;

  @prop({ default: null })
  source: string;

  @prop({ default: null })
  campaign: string;

  @prop({ default: null })
  applyDate: string;

  @prop({ default: null })
  interviewDate: string;

  @prop({ default: null })
  status: string;

  @prop({ default: null })
  mailTracking: string;

  @prop({ default: null })
  createdBy: string;

  @prop({ default: null })
  updatedBy: string;
}

export const TalentSchema = buildSchema(Talent);
