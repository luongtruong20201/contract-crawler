import { Module } from '@nestjs/common';
import { CrawlerProducer } from './services/crawler.producer';
import { CrawlerConsumer } from './services/crawler.consumer';
import { CrawlerConsole } from './services/crawler.console';
import { BullModule } from '@nestjs/bull';
import { EQueueName } from 'src/enums/queue.enum';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';

@Module({
  imports: [
    BullModule.registerQueue({ name: EQueueName.CONTRACT_CRAWLER }),
    BullBoardModule.forFeature({
      name: EQueueName.CONTRACT_CRAWLER,
      adapter: BullAdapter,
    }),
  ],
  providers: [CrawlerProducer, CrawlerConsumer, CrawlerConsole],
})
export class CrawlerModule {}
