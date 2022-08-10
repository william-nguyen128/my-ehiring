import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Talent, TalentSchema } from './schemas/talent.schema';
import { TalentsController } from './talents.controller';
import { TalentsService } from './talents.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Talent.name, schema: TalentSchema }]),
  ],
  controllers: [TalentsController],
  providers: [TalentsService],
})
export class TalentsModule {}
