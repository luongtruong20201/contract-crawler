import { Command, CommandRunner, Option } from 'nest-commander';
import { CrawlerProducer } from './crawler.producer';
import { CrawlerConsumer } from './crawler.consumer';
import { ECrawlerCommandOptions } from '../enums/crawler.enum';
import { ICrawlerCommandOptions } from '../interfaces/crawler-command.interface';

@Command({ name: 'crawler', description: 'Say hello in different ways' })
export class CrawlerConsole extends CommandRunner {
  private name: string;

  constructor(
    private readonly crawlerProducer: CrawlerProducer,
    private readonly crawlerConsumer: CrawlerConsumer,
  ) {
    super();
  }

  @Option({
    flags: '-n, --name [string]',
  })
  parseName(val: string): string {
    this.name = val;
    return val;
  }

  async run(
    passedParams: string[],
    options?: ICrawlerCommandOptions,
  ): Promise<void> {
    switch (options!.name) {
      case ECrawlerCommandOptions.PRODUCER:
        return this.crawlerProducer.start();
      case ECrawlerCommandOptions.CONSUMER:
        return this.crawlerConsumer.start();
      default:
        console.log(
          'Invalid options. Please use one of the following: provider, consumer, submitter',
        );
    }
  }
}
