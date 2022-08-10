import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TalentGeneralDto } from './schemas/talent-general.dto';
import { Talent } from './schemas/talent.schema';
import { TalentsService } from './talents.service';

@ApiTags('talents')
@Controller('talents')
export class TalentsController {
  constructor(private talentsService: TalentsService) {}

  @Get()
  async getGeneralInfo(@Query() query): Promise<any> {
    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    return await this.talentsService.getGeneralInfo(page - 1, limit);
  }

  // TODO: ↓↓↓ No longer needed, used for testing only ↓↓↓
  @Get('show-all')
  async getAllTalent(@Query() query) {
    const { page, limit } = query;
    return await this.talentsService.getTalents(page, limit);
  }
  @Get(':id')
  @ApiNotFoundResponse({ description: 'Talent not found' })
  async getSingleTalent(@Param('id') talentId: string): Promise<Talent> {
    return await this.talentsService.getTalentById(talentId);
  }
  // TODO: ↑↑↑ No longer needed, used for testing only ↑↑↑

  @Get(':id/details')
  @ApiNotFoundResponse({ description: 'Talent not found' })
  async getDetailedInfo(@Param('id') talentId: string): Promise<Talent> {
    return await this.talentsService.getDetailedInfo(talentId);
  }

  // TODO: ↓↓↓ No longer needed, used for testing only ↓↓↓
  @Get(':id/:field')
  @ApiNotFoundResponse({ description: 'Talent not found' })
  async getTalentField(
    @Param('id') talentId: string,
    @Param('field') fieldName: string,
  ): Promise<Talent> {
    return await this.talentsService.getTalentField(talentId, fieldName);
  }
  // TODO: ↑↑↑ No longer needed, used for testing only ↑↑↑

  @Put(':id')
  @ApiBadRequestResponse({ description: 'Invalid input(s)' })
  @ApiNotFoundResponse({ description: 'Talent not found' })
  async updateTalent(
    @Body() updatedTalent: TalentGeneralDto,
    @Param('id') talentId: string,
  ): Promise<Talent> {
    return await this.talentsService.updateTalent(talentId, updatedTalent);
  }

  @Put(':id/favorite')
  @ApiBadRequestResponse({ description: 'Invalid input(s)' })
  @ApiNotFoundResponse({ description: 'Talent not found' })
  async updateFavoriteField(@Param('id') talentId: string) {
    return this.talentsService.updateFavorite(talentId);
  }

  @Delete(':id')
  @ApiBadRequestResponse({ description: 'Invalid input(s)' })
  @ApiNotFoundResponse({ description: 'Talent not found' })
  async deleteTalent(@Param('id') talentId: string): Promise<Talent> {
    return await this.talentsService.deleteTalent(talentId);
  }

  @Post()
  @ApiBadRequestResponse({ description: 'Invalid input(s)' })
  async createTalent(@Body() newTalent: TalentGeneralDto): Promise<Talent> {
    return await this.talentsService.createTalent(newTalent);
  }

  @Post('seed/:amount')
  async seedTalents(@Param('amount') numberOfTalents: number): Promise<Talent> {
    return await this.talentsService.seedTalents(numberOfTalents);
  }
}
