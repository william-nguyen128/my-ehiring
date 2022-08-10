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
import { PoolsService } from './pools.service';
import { PoolGeneralDto } from './schemas/pool-general.dto';
import { Pool } from './schemas/pool.schema';

@ApiTags('pools')
@Controller('pools')
export class PoolsController {
  constructor(private poolsService: PoolsService) {}

  @Get()
  async getAllPool(): Promise<Pool[]> {
    return await this.poolsService.getPools();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Pool not found' })
  async getSinglePool(@Param('id') poolId: string): Promise<Pool> {
    return await this.poolsService.getPoolById(poolId);
  }

  @Put(':id')
  @ApiBadRequestResponse({ description: 'name should not be empty' })
  @ApiNotFoundResponse({ description: 'Pool not found' })
  async updatePool(
    @Body() updatedPool: PoolGeneralDto,
    @Param('id') poolId: string,
  ): Promise<Pool> {
    return await this.poolsService.updatePool(poolId, updatedPool);
  }

  @Delete(':id')
  @ApiBadRequestResponse({ description: 'name should not be empty' })
  @ApiNotFoundResponse({ description: 'Pool not found' })
  async deletePool(@Param('id') poolId: string): Promise<Pool> {
    return await this.poolsService.deletePool(poolId);
  }

  @Post()
  @ApiBadRequestResponse({ description: 'name should not be empty' })
  async createPool(@Body() newPool: PoolGeneralDto): Promise<Pool> {
    return await this.poolsService.createPool(newPool);
  }

  @Post('seed/:amount')
  async seedPools(@Param('amount') numberOfPools: number): Promise<Pool> {
    return await this.poolsService.seedPools(numberOfPools);
  }
}
