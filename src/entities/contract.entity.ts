import { ETableName } from 'src/enums/database.enum';
import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity(ETableName.CONTRACT)
export class ContractEntity extends CustomBaseEntity {
  @Column({ nullable: false })
  address: string;
}
