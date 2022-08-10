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
import { AbilitiesService } from './abilities.service';
import { AbilityGeneralDto } from './schemas/ability-general.dto';
import { Ability } from './schemas/ability.schema';

@ApiTags('abilities')
@Controller('abilities')
export class AbilitiesController {
  constructor(private abilitiesService: AbilitiesService) {}

  @Get()
  async getAllAbilities(): Promise<Ability[]> {
    return await this.abilitiesService.getAbilities();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Ability not found' })
  async getSingleAbility(@Param('id') abilityId: string): Promise<Ability> {
    return await this.abilitiesService.getAbilityById(abilityId);
  }

  @Put(':id')
  @ApiBadRequestResponse({ description: 'name should not be empty' })
  @ApiNotFoundResponse({ description: 'Ability not found' })
  async updateAbility(
    @Body() updatedAbility: AbilityGeneralDto,
    @Param('id') abilityId: string,
  ): Promise<Ability> {
    return await this.abilitiesService.updateAbility(abilityId, updatedAbility);
  }

  @Delete(':id')
  @ApiBadRequestResponse({ description: 'name should not be empty' })
  @ApiNotFoundResponse({ description: 'Ability not found' })
  async deleteAbility(@Param('id') abilityId: string): Promise<Ability> {
    return await this.abilitiesService.deleteAbility(abilityId);
  }

  @Post()
  @ApiBadRequestResponse({ description: 'name should not be empty' })
  async createAbility(@Body() newAbility: AbilityGeneralDto): Promise<Ability> {
    return await this.abilitiesService.createAbility(newAbility);
  }

  @Post('seed/:amount')
  async seedAbilities(
    @Param('amount') numberOfAbilities: number,
  ): Promise<Ability> {
    return await this.abilitiesService.seedAbilities(numberOfAbilities);
  }
}
