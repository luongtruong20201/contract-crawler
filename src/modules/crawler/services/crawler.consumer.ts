import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CrawlerConsumer {
  private readonly logger = new Logger(CrawlerConsumer.name);

  async start() {
    this.logger.log('Starting Crawler Consumer...');
  }
}
