import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DependencyTable } from '../../dependency-table/entities/dependency-table.entity';
import { AccountTable } from './account-table.entity';

@Table({ tableName: 'account_dependency', createdAt: false, updatedAt: false })
export class Account_DependencyTable extends Model<Account_DependencyTable> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => AccountTable)
  account_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => DependencyTable)
  dependency_id: number;

  @BelongsTo(() => AccountTable)
  account: AccountTable;

  @BelongsTo(() => DependencyTable)
  role: DependencyTable;
}
