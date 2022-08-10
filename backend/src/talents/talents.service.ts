import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { PaginateModel } from 'mongoose';
import { TalentGeneralDto } from './schemas/talent-general.dto';
import { Talent } from './schemas/talent.schema';
import { faker } from '@faker-js/faker';

@Injectable()
export class TalentsService {
  private readonly logger = new Logger(TalentsService.name);

  constructor(
    @InjectModel('Talent')
    private talentModel: ReturnModelType<typeof Talent>,
    @InjectModel('Talent')
    private talentModelPag: PaginateModel<typeof Talent>,
  ) {}

  // TODO: ↓↓↓ No longer needed, used for testing only ↓↓↓
  async getTalents(page: number, limit: number) {
    return await this.talentModelPag.paginate(
      {},
      { offset: page - 1, limit: limit },
    );
  }
  async getTalentField(talentId: string, fieldName: string): Promise<Talent> {
    const foundTalent = await this.talentModel.findById(talentId);
    if (!foundTalent) {
      throw new NotFoundException('Talent not found');
    }
    this.logger.log(
      `Returning field '${fieldName}' of talent of ID: ${talentId}`,
    );
    return foundTalent[fieldName];
  }
  // TODO: ↑↑↑ No longer needed, used for testing only ↑↑↑

  async getGeneralInfo(page: number, limit: number): Promise<any> {
    this.logger.log('Returning the general info of all talents');
    return await this.talentModelPag.paginate(
      {},
      {
        select: `basics.name basics.gender 
                 basics.image basics.email basics.phone 
        job hashTags finalRating source campaign 
        applyDate interviewDate status mailTracking`,
        offset: page,
        limit: limit,
      },
    );
  }

  async getDetailedInfo(talentId: string): Promise<Talent> {
    const foundTalent = await this.talentModel.findById(talentId, {})
      .select(`basics.name basics.dob basics.image basics.email
               basics.phone basics.url basics.summary basics.location.address
               skills works educations languages certificates`);
    if (!foundTalent) {
      throw new NotFoundException('Talent not found');
    }
    this.logger.log(`Returning the detailed info of talent of ID: ${talentId}`);
    return foundTalent;
  }

  // TODO: ↓↓↓ No longer needed, used for testing only ↓↓↓
  async getTalentById(talentId: string): Promise<Talent> {
    const foundTalent = await this.talentModel.findById(talentId);
    if (!foundTalent) {
      throw new NotFoundException('Talent not found');
    }
    this.logger.log(`Returning all fields of talent of ID: ${talentId}`);
    return foundTalent;
  }
  // TODO: ↑↑↑ No longer needed, used for testing only ↑↑↑

  async deleteTalent(talentId: string): Promise<Talent> {
    const foundTalent = await this.talentModel.findByIdAndDelete(talentId);
    if (!foundTalent) {
      throw new NotFoundException('Talent not found');
    }
    this.logger.log(`Deleting talent of ID: ${talentId}`);
    return foundTalent;
  }

  async createTalent(createdTalent: TalentGeneralDto): Promise<Talent> {
    this.logger.log('Creating a new talent');
    createdTalent = this.finalizeRating(createdTalent);
    const newTalent = new this.talentModel(createdTalent);
    return newTalent.save();
  }

  async updateTalent(
    talentId: string,
    updatedTalent: TalentGeneralDto,
  ): Promise<Talent> {
    const foundTalent = await this.talentModel.findById(talentId);
    if (!foundTalent) {
      throw new NotFoundException('Talent not found');
    }
    this.logger.log(`Updating talent of ID: ${talentId}`);
    updatedTalent = this.finalizeRating(updatedTalent);
    const newTalent = await foundTalent.updateOne(updatedTalent, {
      new: true,
    });
    return newTalent;
  }

  async updateFavorite(talentId: string): Promise<Talent> {
    const foundTalent = await this.talentModel.findById(talentId);
    if (!foundTalent) {
      throw new NotFoundException('Talent not found');
    }
    this.logger.log(
      `Updating talent of ID: ${talentId}'s favorite to: ${!foundTalent.isFavorite}`,
    );
    return await this.talentModel
      .findByIdAndUpdate(
        talentId,
        { isFavorite: !foundTalent['isFavorite'] },
        { new: true },
      )
      .select('isFavorite');
  }

  finalizeRating(talent: TalentGeneralDto): TalentGeneralDto {
    let avgRating = 0;
    let recommended = 0;

    if (talent['ratings']) {
      talent['ratings'].forEach((rating: any) => {
        avgRating += rating['rating'];
        recommended += rating['isRecommending'] ? 1 : 0;
      });
    }

    if (avgRating != 0) {
      avgRating /= talent['ratings'].length;
    }

    talent['finalRating'] = {
      avgRating: avgRating,
      recommended: recommended,
    };

    return talent;
  }

  async seedTalents(numberOfTalents: number): Promise<Talent> {
    await this.talentModel.deleteMany();
    this.logger.log('Seeding talents...');
    for (let i = 0; i < numberOfTalents; i++) {
      const generatedName: string = faker.name.findName();
      const fullName: string[] = generatedName.split(' ', generatedName.length);
      const networks: string[] = [
        'Facebook',
        'Twitter',
        'LinkedIn',
        'Instagram',
        'Youtube',
        'Bilibili',
      ];
      const languages: string[] = [
        'English',
        'Spanish',
        'Japanese',
        'Vietnamese',
        'Danish',
        'Polish',
        'French',
      ];
      const ratings: number[] = [
        0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0,
      ];
      const applyDate = faker.date.past();

      let generatedTalent: TalentGeneralDto = {
        basics: {
          name: generatedName,
          gender: faker.name.gender(true),
          dob: faker.date.birthdate().toLocaleString([], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }),
          label: faker.name.jobTitle(),
          image: faker.image.avatar(),
          email: faker.internet.email(fullName[0], fullName[1]),
          phone: faker.phone.number(),
          url: faker.internet.url(),
          summary: faker.lorem.paragraphs(3, '<br/>'),
          location: {
            address: faker.address.streetAddress(),
            postalCode: faker.address.zipCode(),
            city: faker.address.cityName(),
            countryCode: faker.address.countryCode(),
            region: faker.address.county(),
          },
          profiles: [
            {
              network: networks[Math.floor(Math.random() * networks.length)],
              username: faker.internet.userName(fullName[0], fullName[1]),
              url: faker.internet.url(),
            },
          ],
        },
        works: [
          {
            name: faker.company.companyName(),
            position: faker.name.jobTitle(),
            location: faker.address.streetAddress(),
            url: faker.internet.url(),
            startDate: faker.date.past().toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }),
            endDate: faker.date.future().toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }),
            summary: faker.lorem.paragraphs(3, '<br/>'),
            highlights: [faker.lorem.sentence()],
          },
        ],
        volunteers: [
          {
            organization: faker.company.companyName(),
            position: faker.name.jobTitle(),
            url: faker.internet.url(),
            startDate: faker.date.past().toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }),
            endDate: faker.date.future().toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }),
            summary: faker.lorem.paragraphs(3, '<br/>'),
            highlights: [faker.lorem.sentence()],
          },
        ],
        educations: [
          {
            insititution: faker.company.companyName(),
            url: faker.internet.url(),
            area: faker.name.jobArea(),
            studyType: faker.name.jobType(),
            startDate: faker.date.past().toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }),
            endDate: faker.date.future().toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }),
            score: '4.0',
            courses: [faker.lorem.words(5)],
          },
        ],
        awards: [
          {
            title: faker.lorem.words(5),
            date: faker.date.past().toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }),
            awarder: faker.company.companyName(),
            summary: faker.lorem.paragraphs(3, '<br/>'),
          },
        ],
        certificates: [
          {
            name: faker.lorem.words(5),
            date: faker.date.past().toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }),
            issuer: faker.company.companyName(),
            url: faker.internet.url(),
          },
        ],
        publications: [
          {
            name: faker.lorem.words(10),
            publisher: faker.company.companyName(),
            releaseDate: faker.date.past().toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }),
            url: faker.internet.url(),
            summary: faker.lorem.paragraphs(3, '<br/>'),
          },
        ],
        skills: [
          {
            name: faker.lorem.words(5),
            level: faker.lorem.words(3),
            keywords: [faker.lorem.sentence()],
          },
        ],
        languages: [
          {
            language: languages[Math.floor(Math.random() * languages.length)],
            fluency: faker.lorem.words(3),
          },
        ],
        interests: [
          {
            name: faker.lorem.words(5),
            keywords: [faker.lorem.sentence()],
          },
        ],
        references: [
          {
            name: faker.lorem.words(5),
            reference: faker.lorem.paragraphs(3, '<br/>'),
          },
        ],
        projects: [
          {
            name: faker.lorem.words(5),
            description: faker.lorem.paragraphs(3, '<br/>'),
            highlights: [faker.lorem.sentence()],
            keywords: [faker.lorem.words(5)],
            startDate: faker.date.past().toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }),
            endDate: faker.date.future().toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }),
            url: faker.internet.url(),
            roles: [faker.name.jobTitle()],
            entity: 'Entity',
            type: 'Application',
          },
        ],
        hashTags: ['HTML', 'CSS', 'CI/CD'],
        job: faker.name.jobTitle(),
        ratings: [
          {
            userId: faker.database.mongodbObjectId(),
            isRecommending: faker.datatype.boolean(),
            rating: ratings[Math.floor(Math.random() * ratings.length)],
          },
          {
            userId: faker.database.mongodbObjectId(),
            isRecommending: faker.datatype.boolean(),
            rating: ratings[Math.floor(Math.random() * ratings.length)],
          },
          {
            userId: faker.database.mongodbObjectId(),
            isRecommending: faker.datatype.boolean(),
            rating: ratings[Math.floor(Math.random() * ratings.length)],
          },
        ],
        source: 'Referral',
        campaign: 'My campaign',
        applyDate: applyDate.toLocaleString([], {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }),
        interviewDate: faker.date.soon().toLocaleString([], {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }),
        status: 'Pending',
        mailTracking: 'In-progress',
      };
      generatedTalent = this.finalizeRating(generatedTalent);
      await new this.talentModel(generatedTalent).save();
    }
    this.logger.log('Talents seeded successfully!');
    return;
  }
}
