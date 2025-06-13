import { Injectable } from '@nestjs/common';
import { ContractEntity } from 'src/entities/contract.entity';
import { ETableName } from 'src/enums/database.enum';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class ContractRepository extends BaseRepository<ContractEntity> {
  protected readonly alias: ETableName.CONTRACT;

  constructor(private readonly dataSource: DataSource) {
    super(ContractEntity, dataSource.createEntityManager());
  }
}
