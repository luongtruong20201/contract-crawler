import { Injectable } from '@nestjs/common';
import { CrawlerEntity } from 'src/entities/crawler.entity';
import { ETableName } from 'src/enums/database.enum';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class CrawlerRepository extends BaseRepository<CrawlerEntity> {
  protected alias: ETableName = ETableName.CONTRACT;

  constructor(private readonly dataSource: DataSource) {
    super(CrawlerEntity, dataSource.createEntityManager());
  }
}
