import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EEnv } from 'src/enums/env.enum';
import { CrawlerRepository } from 'src/repositories/crawler.repository';
import { Web3Service } from 'src/shared/modules/web3/web3.service';
import { ICrawlerJob } from '../interfaces/crawler-job.interface';
import { sleepInSeconds } from 'src/shared/utils/time';
import { CrawlerEntity } from 'src/entities/crawler.entity';
import { InjectQueue } from '@nestjs/bull';
import { EQueueName } from 'src/enums/queue.enum';
import { Queue } from 'bull';

@Injectable()
export class CrawlerProducer {
  private readonly logger = new Logger(CrawlerProducer.name);
  private readonly maxBlockRange: number;
  private readonly minBlockRange: number;

  constructor(
    private readonly web3Service: Web3Service,
    private readonly configService: ConfigService,
    private readonly crawlerRepository: CrawlerRepository,
    @InjectQueue(EQueueName.CONTRACT_CRAWLER) private readonly queue: Queue,
  ) {
    this.maxBlockRange = this.configService.get<number>(EEnv.MAX_BLOCK_RANGE)!;
    this.minBlockRange = this.configService.get<number>(EEnv.MIN_BLOCK_RANGE)!;
  }

  async start() {
    this.logger.log('Starting Crawler Producer...');

    while (true) {
      let job: ICrawlerJob;
      let crawlerRecord: CrawlerEntity;
      while (true) {
        const [networkLatestBlock, crawler] = await Promise.all([
          this.web3Service.getBlockNumber(),
          this.crawlerRepository.findOneByOrFail({}),
        ]);
        const latestBlock = Number(networkLatestBlock);

        if (crawler.blockNumber + this.minBlockRange >= latestBlock) {
          this.logger.log(
            `Not enough blocks to crawl. latestBlock: ${latestBlock} --- currentBlock: ${crawler.blockNumber}. Waiting...`,
          );
          await sleepInSeconds(5);
          continue;
        }

        const fromBlock = crawler.blockNumber;
        const toBlock = Math.min(
          latestBlock,
          fromBlock + this.maxBlockRange - 1,
        );
        job = {
          fromBlock,
          toBlock,
        };
        crawlerRecord = crawler;
        break;
      }

      await this.queue.add(job, {
        removeOnComplete: {
          age: 1000 * 60 * 60 * 24,
        },
        removeOnFail: false,
        attempts: 5,
        backoff: {
          type: 'fixed',
          delay: 1000 * 60 * 5,
        },
        delay: 0,
      });
      this.logger.log(
        `Job created: fromBlock: ${job.fromBlock}, toBlock: ${job.toBlock}`,
      );

      crawlerRecord.blockNumber = job.toBlock + 1;
      await this.crawlerRepository.save(crawlerRecord);
      await sleepInSeconds(0.1);
    }
  }
}
