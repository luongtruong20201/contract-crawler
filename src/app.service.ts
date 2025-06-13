import { Injectable, OnModuleInit } from '@nestjs/common';
import { CrawlerRepository } from './repositories/crawler.repository';
import { ConfigService } from '@nestjs/config';
import { EEnv } from './enums/env.enum';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly crawlerReposity: CrawlerRepository,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const crawler = await this.crawlerReposity.findOneBy({});
    if (!crawler) {
      await this.crawlerReposity.save({
        blockNumber: this.configService.get<number>(EEnv.START_BLOCK) || 0,
      });
    }
    return;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
