import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config';
import { TalentsModule } from './talents/talents.module';
import { JobsModule } from './jobs/jobs.module';
import { PoolsModule } from './pools/pools.module';
import { UsersModule } from './users/users.module';
import { AbilitiesModule } from './abilities/abilities.module';
import { AbilityFramesModule } from './ability-frames/ability-frames.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({ uri: config.get('uri') }),
    }),
    // MongooseModule.forRoot('mongodb://localhost/ehiring'),
    TalentsModule,
    JobsModule,
    PoolsModule,
    UsersModule,
    AbilitiesModule,
    AbilityFramesModule,
    CacheModule.register({ isGlobal: true, ttl: 3600 }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
