import { Module } from '@nestjs/common';
import { CrawlerProducer } from './services/crawler.producer';
import { CrawlerConsumer } from './services/crawler.consumer';
import { CrawlerConsole } from './services/crawler.console';

@Module({
  providers: [CrawlerProducer, CrawlerConsumer, CrawlerConsole],
})
export class CrawlerModule {}
