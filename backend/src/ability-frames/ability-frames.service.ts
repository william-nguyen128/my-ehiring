import { faker } from '@faker-js/faker';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AbilityFrameGeneralDto } from './schemas/ability-frame-general.dto';
import { AbilityFrame } from './schemas/ability-frame.schema';

@Injectable()
export class AbilityFramesService {
  private readonly logger = new Logger(AbilityFramesService.name);

  constructor(
    @InjectModel('AbilityFrame')
    private abilityFrameModel: ReturnModelType<typeof AbilityFrame>,
  ) {}

  async getAbilityFrames(): Promise<AbilityFrame[]> {
    this.logger.log('Returning all ability frames');
    return await this.abilityFrameModel.find().exec();
  }

  async getAbilityFrameById(abilityFrameId: string): Promise<AbilityFrame> {
    const foundAbilityFrame = await this.abilityFrameModel.findById(
      abilityFrameId,
    );
    if (!foundAbilityFrame) {
      throw new NotFoundException('Ability frame not found');
    }
    this.logger.log(
      `Returning all fields of ability frame of ID: ${abilityFrameId}`,
    );
    return foundAbilityFrame;
  }

  async updateAbilityFrame(
    abilityFrameId: string,
    updatedAbilityFrame: AbilityFrameGeneralDto,
  ): Promise<AbilityFrame> {
    const foundAbilityFrame = await this.abilityFrameModel.findByIdAndUpdate(
      abilityFrameId,
      updatedAbilityFrame,
      {
        new: true,
      },
    );
    if (!foundAbilityFrame) {
      throw new NotFoundException('Ability frame not found');
    }
    this.logger.log(`Updating ability frame of ID: ${abilityFrameId}`);
    return foundAbilityFrame;
  }

  async deleteAbilityFrame(abilityFrameId: string): Promise<AbilityFrame> {
    const foundAbilityFrame = await this.abilityFrameModel.findByIdAndDelete(
      abilityFrameId,
    );
    if (!foundAbilityFrame) {
      throw new NotFoundException('Ability frame not found');
    }
    this.logger.log(`Deleting ability frame of ID: ${abilityFrameId}`);
    return foundAbilityFrame;
  }

  async createAbilityFrame(
    createdAbilityFrame: AbilityFrameGeneralDto,
  ): Promise<AbilityFrame> {
    this.logger.log('Creating a new ability frame');
    const newAbilityFrame = await new this.abilityFrameModel(
      createdAbilityFrame,
    );
    return newAbilityFrame.save();
  }

  async seedAbilityFrames(
    numberOfAbilityFrames: number,
  ): Promise<AbilityFrame> {
    await this.abilityFrameModel.deleteMany();
    this.logger.log('Seeding ability frames...');
    for (let i = 0; i < numberOfAbilityFrames; i++) {
      const generatedAbilityFrame: AbilityFrameGeneralDto = {
        name: faker.name.jobType(),
        description: faker.lorem.paragraphs(2),
        abilities: [
          faker.database.mongodbObjectId(),
          faker.database.mongodbObjectId(),
          faker.database.mongodbObjectId(),
          faker.database.mongodbObjectId(),
          faker.database.mongodbObjectId(),
        ],
      };
      await new this.abilityFrameModel(generatedAbilityFrame).save();
    }
    this.logger.log('Ability Frames seeded successfully!');
    return;
  }
}
