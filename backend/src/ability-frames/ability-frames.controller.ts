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
import { AbilityFramesService } from './ability-frames.service';
import { AbilityFrameGeneralDto } from './schemas/ability-frame-general.dto';
import { AbilityFrame } from './schemas/ability-frame.schema';

@ApiTags('ability-frames')
@Controller('ability-frames')
export class AbilityFramesController {
  constructor(private abilityFramesService: AbilityFramesService) {}

  @Get()
  async getAllAbilityFrames(): Promise<AbilityFrame[]> {
    return await this.abilityFramesService.getAbilityFrames();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Ability frame not found' })
  async getSingleAbilityFrame(
    @Param('id') abilityFrameId: string,
  ): Promise<AbilityFrame> {
    return await this.abilityFramesService.getAbilityFrameById(abilityFrameId);
  }

  @Put(':id')
  @ApiBadRequestResponse({ description: 'name should not be empty' })
  @ApiNotFoundResponse({ description: 'Ability frame not found' })
  async updateAbilityFrame(
    @Body() updatedAbilityFrame: AbilityFrameGeneralDto,
    @Param('id') abilityFrameId: string,
  ): Promise<AbilityFrame> {
    return await this.abilityFramesService.updateAbilityFrame(
      abilityFrameId,
      updatedAbilityFrame,
    );
  }

  @Delete(':id')
  @ApiBadRequestResponse({ description: 'name should not be empty' })
  @ApiNotFoundResponse({ description: 'Ability frame not found' })
  async deleteAbilityFrame(
    @Param('id') abilityFrameId: string,
  ): Promise<AbilityFrame> {
    return await this.abilityFramesService.deleteAbilityFrame(abilityFrameId);
  }

  @Post()
  @ApiBadRequestResponse({ description: 'name should not be empty' })
  async createAbilityFrame(
    @Body() newAbilityFrame: AbilityFrameGeneralDto,
  ): Promise<AbilityFrame> {
    return await this.abilityFramesService.createAbilityFrame(newAbilityFrame);
  }

  @Post('seed/:amount')
  async seedAbilityFrames(
    @Param('amount') numberOfAbilityFrames: number,
  ): Promise<AbilityFrame> {
    return await this.abilityFramesService.seedAbilityFrames(
      numberOfAbilityFrames,
    );
  }
}
