import { faker } from '@faker-js/faker';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AbilityGeneralDto } from './schemas/ability-general.dto';
import { Ability } from './schemas/ability.schema';

@Injectable()
export class AbilitiesService {
  private readonly logger = new Logger(AbilitiesService.name);

  constructor(
    @InjectModel('Ability')
    private abilityModel: ReturnModelType<typeof Ability>,
  ) {}

  async getAbilities(): Promise<Ability[]> {
    this.logger.log('Returning all abilities');
    return await this.abilityModel.find().exec();
  }

  async getAbilityById(abilityId: string): Promise<Ability> {
    const foundAbility = await this.abilityModel.findById(abilityId);
    if (!foundAbility) {
      throw new NotFoundException('Ability not found');
    }
    this.logger.log(`Returning all fields of ability of ID: ${abilityId}`);
    return foundAbility;
  }

  async updateAbility(
    abilityId: string,
    updatedAbility: AbilityGeneralDto,
  ): Promise<Ability> {
    const foundAbility = await this.abilityModel.findByIdAndUpdate(
      abilityId,
      updatedAbility,
      {
        new: true,
      },
    );
    if (!foundAbility) {
      throw new NotFoundException('Ability not found');
    }
    this.logger.log(`Updating ability of ID: ${abilityId}`);
    return foundAbility;
  }

  async deleteAbility(abilityId: string): Promise<Ability> {
    const foundAbility = await this.abilityModel.findByIdAndDelete(abilityId);
    if (!foundAbility) {
      throw new NotFoundException('Ability not found');
    }
    this.logger.log(`Deleting ability of ID: ${abilityId}`);
    return foundAbility;
  }

  async createAbility(createdAbility: AbilityGeneralDto): Promise<Ability> {
    this.logger.log('Creating a new ability');
    const newAbility = await new this.abilityModel(createdAbility);
    return newAbility.save();
  }

  async seedAbilities(numberOfAbilitys: number): Promise<Ability> {
    await this.abilityModel.deleteMany();
    this.logger.log('Seeding abilities...');
    for (let i = 0; i < numberOfAbilitys; i++) {
      const generatedAbility: AbilityGeneralDto = {
        name: faker.word.noun(10),
        description: faker.lorem.sentence(),
        questionnaire: [
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
        ],
      };
      await new this.abilityModel(generatedAbility).save();
    }
    this.logger.log('Abilities seeded successfully!');
    return;
  }
}
