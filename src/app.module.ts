import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { ContractModule } from './modules/contracts/contract.module';
import { Web3Module } from './shared/modules/web3/web3.module';
import { CrawlerModule } from './modules/crawler/crawler.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    ContractModule,
    Web3Module,
    CrawlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
