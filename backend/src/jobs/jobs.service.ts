import { faker } from '@faker-js/faker';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { JobGeneralDto } from './schemas/job-general.dto';
import { Job } from './schemas/job.schema';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    @InjectModel('Job') private jobModel: ReturnModelType<typeof Job>,
  ) {}

  async getJobs(): Promise<Job[]> {
    this.logger.log('Returning all jobs');
    return await this.jobModel.find().exec();
  }

  async getJobById(jobId: string): Promise<Job> {
    const foundJob = await this.jobModel.findById(jobId);
    if (!foundJob) {
      throw new NotFoundException('Job not found');
    }
    this.logger.log(`Returning all fields of job of ID: ${jobId}`);
    return foundJob;
  }

  async updateJob(jobId: string, updatedJob: JobGeneralDto): Promise<Job> {
    const foundJob = await this.jobModel.findByIdAndUpdate(jobId, updatedJob, {
      new: true,
    });
    if (!foundJob) {
      throw new NotFoundException('Job not found');
    }
    this.logger.log(`Updating job of ID: ${jobId}`);
    return foundJob;
  }

  async deleteJob(jobId: string): Promise<Job> {
    const foundJob = await this.jobModel.findByIdAndDelete(jobId);
    if (!foundJob) {
      throw new NotFoundException('Job not found');
    }
    this.logger.log(`Deleting job of ID: ${jobId}`);
    return foundJob;
  }

  async createJob(createdJob: JobGeneralDto): Promise<Job> {
    this.logger.log('Creating a new job');
    const newJob = await new this.jobModel(createdJob);
    return newJob.save();
  }

  async seedJobs(numberOfJobs: number): Promise<Job> {
    await this.jobModel.deleteMany();
    this.logger.log('Seeding jobs...');
    for (let i = 0; i < numberOfJobs; i++) {
      const generatedJob: JobGeneralDto = {
        name: faker.name.jobTitle(),
        description: faker.lorem.paragraphs(2),
        talentPool: faker.database.mongodbObjectId(),
      };
      await new this.jobModel(generatedJob).save();
    }
    this.logger.log('Jobs seeded successfully!');
    return;
  }
}
