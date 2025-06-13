import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CrawlerProducer {
  private readonly logger = new Logger(CrawlerProducer.name);

  constructor() {}

  async start() {
    this.logger.log('Starting Crawler Producer...');
  }
}
