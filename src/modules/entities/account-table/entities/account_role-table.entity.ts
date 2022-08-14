import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { RoleTable } from '../../role-table/entities/role-table.entity';
import { AccountTable } from './account-table.entity';

@Table({ tableName: 'account_role', createdAt: false, updatedAt: false })
export class Account_RoleTable extends Model<Account_RoleTable> {
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
  @ForeignKey(() => RoleTable)
  role_id: number;

  @BelongsTo(() => AccountTable)
  account: AccountTable;

  @BelongsTo(() => RoleTable)
  role: RoleTable;
}
