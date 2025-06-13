import { ETableName } from 'src/enums/database.enum';
import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity(ETableName.CRAWLER)
export class CrawlerEntity extends CustomBaseEntity {
  @Column({ name: 'block_number', nullable: false })
  blockNumber: number;
}
