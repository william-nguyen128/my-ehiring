import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { JobGeneralDto } from './schemas/job-general.dto';
import { Job } from './schemas/job.schema';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async getAllJob(): Promise<Job[]> {
    return await this.jobsService.getJobs();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Job not found' })
  async getSingleJob(@Param('id') jobId: string): Promise<Job> {
    return await this.jobsService.getJobById(jobId);
  }

  @Put(':id')
  @ApiBadRequestResponse({ description: 'name should not be empty' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  async updateJob(
    @Body() updatedJob: JobGeneralDto,
    @Param('id') jobId: string,
  ): Promise<Job> {
    return await this.jobsService.updateJob(jobId, updatedJob);
  }

  @Delete(':id')
  @ApiBadRequestResponse({ description: 'name should not be empty' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  async deleteJob(@Param('id') jobId: string): Promise<Job> {
    return await this.jobsService.deleteJob(jobId);
  }

  @Post()
  @ApiBadRequestResponse({ description: 'name should not be empty' })
  async createJob(@Body() newJob: JobGeneralDto): Promise<Job> {
    return await this.jobsService.createJob(newJob);
  }

  @Post('seed/:amount')
  async seedJobs(@Param('amount') numberOfJobs: number): Promise<Job> {
    return await this.jobsService.seedJobs(numberOfJobs);
  }
}
