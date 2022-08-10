import { faker } from '@faker-js/faker';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { PoolGeneralDto } from './schemas/pool-general.dto';
import { Pool } from './schemas/pool.schema';

@Injectable()
export class PoolsService {
  private readonly logger = new Logger(PoolsService.name);

  constructor(
    @InjectModel('Pool') private poolModel: ReturnModelType<typeof Pool>,
  ) {}

  async getPools(): Promise<Pool[]> {
    this.logger.log('Returning all pools');
    return await this.poolModel.find().exec();
  }

  async getPoolById(poolId: string): Promise<Pool> {
    const foundPool = await this.poolModel.findById(poolId);
    if (!foundPool) {
      throw new NotFoundException('Pool not found');
    }
    this.logger.log(`Returning all fields of pool of ID: ${poolId}`);
    return foundPool;
  }

  async updatePool(poolId: string, updatedPool: PoolGeneralDto): Promise<Pool> {
    const foundPool = await this.poolModel.findByIdAndUpdate(
      poolId,
      updatedPool,
      {
        new: true,
      },
    );
    if (!foundPool) {
      throw new NotFoundException('Pool not found');
    }
    this.logger.log(`Updating pool of ID: ${poolId}`);
    return foundPool;
  }

  async deletePool(poolId: string): Promise<Pool> {
    const foundPool = await this.poolModel.findByIdAndDelete(poolId);
    if (!foundPool) {
      throw new NotFoundException('Pool not found');
    }
    this.logger.log(`Deleting pool of ID: ${poolId}`);
    return foundPool;
  }

  async createPool(createdPool: PoolGeneralDto): Promise<Pool> {
    this.logger.log('Creating a new pool');
    const newPool = new this.poolModel(createdPool);
    return newPool.save();
  }

  async seedPools(numberOfPools: number): Promise<Pool> {
    await this.poolModel.deleteMany();
    this.logger.log('Seeding pools...');
    for (let i = 0; i < numberOfPools; i++) {
      const generatedPool: PoolGeneralDto = {
        name: faker.name.jobType(),
        description: faker.lorem.paragraphs(2),
      };
      await new this.poolModel(generatedPool).save();
    }
    this.logger.log('Pools seeded successfully!');
    return;
  }
}
