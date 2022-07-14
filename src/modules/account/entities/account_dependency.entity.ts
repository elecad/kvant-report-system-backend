import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Dependency } from 'src/modules/dependency/entities/dependency.entity';
import { Account } from './account.entity';

@Table({ tableName: 'account_dependency', createdAt: false, updatedAt: false })
export class Account_Dependency extends Model<Account_Dependency> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Account)
  account_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Dependency)
  dependency_id: number;

  @BelongsTo(() => Account)
  account: Account;

  @BelongsTo(() => Dependency)
  role: Dependency;
}
