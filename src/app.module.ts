import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './modules/config/config.module';
import { ContractModule } from './modules/contracts/contract.module';
import { CrawlerModule } from './modules/crawler/crawler.module';
import { DatabaseModule } from './modules/database/database.module';
import { Web3Module } from './shared/modules/web3/web3.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EEnv } from './enums/env.enum';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    ContractModule,
    Web3Module,
    CrawlerModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>(EEnv.REDIS_HOST),
          port: configService.get<number>(EEnv.REDIS_PORT),
        },
      }),
    }),
    BullBoardModule.forRoot({ route: 'queues', adapter: ExpressAdapter }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
