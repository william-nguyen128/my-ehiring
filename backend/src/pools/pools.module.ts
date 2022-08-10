import { Module } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { PoolsController } from './pools.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pool, PoolSchema } from './schemas/pool.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pool.name, schema: PoolSchema }]),
  ],
  providers: [PoolsService],
  controllers: [PoolsController],
})
export class PoolsModule {}
