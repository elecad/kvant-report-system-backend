import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/modules/account/entities/account.entity';

export interface SessionCreateAttr {
  token: string;
  account_id: number;
}

@Table({ tableName: 'session', updatedAt: false })
export class Session extends Model<Session, SessionCreateAttr> {
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
  @ForeignKey(() => Account)
  account_id: number;

  @BelongsTo(() => Account)
  account: Account;
}
