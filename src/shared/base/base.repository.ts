import { ETableName } from 'src/enums/database.enum';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';

export abstract class BaseRepository<
  T extends ObjectLiteral,
> extends Repository<T> {
  protected abstract alias: ETableName;

  protected createQB(): SelectQueryBuilder<T> {
    return this.createQueryBuilder(this.alias);
  }
}
