import { Module } from '@nestjs/common';
import { AbilityFramesService } from './ability-frames.service';
import { AbilityFramesController } from './ability-frames.controller';
import {
  AbilityFrame,
  AbilityFrameSchema,
} from './schemas/ability-frame.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AbilityFrame.name, schema: AbilityFrameSchema },
    ]),
  ],
  providers: [AbilityFramesService],
  controllers: [AbilityFramesController],
})
export class AbilityFramesModule {}
