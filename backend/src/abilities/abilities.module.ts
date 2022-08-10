import { Module } from '@nestjs/common';
import { AbilitiesService } from './abilities.service';
import { AbilitiesController } from './abilities.controller';
import { Ability, AbilitySchema } from './schemas/ability.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ability.name, schema: AbilitySchema }]),
  ],
  providers: [AbilitiesService],
  controllers: [AbilitiesController],
})
export class AbilitiesModule {}
