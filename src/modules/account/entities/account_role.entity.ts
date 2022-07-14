import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/modules/role/entities/role.entity';
import { Account } from './account.entity';

@Table({ tableName: 'account', createdAt: false, updatedAt: false })
export class Account_Role extends Model<Account_Role> {
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
  @ForeignKey(() => Role)
  role_id: number;
}
