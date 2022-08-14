import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { AccountTable } from '../../account-table/entities/account-table.entity';

export interface SessionTableCreateAttr {
  token: string;
  account_id: number;
}

@Table({ tableName: 'session', updatedAt: false })
export class SessionTable extends Model<SessionTable, SessionTableCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  token: string;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => AccountTable)
  account_id: number;

  @BelongsTo(() => AccountTable)
  account: AccountTable;
}
