import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/modules/role/entities/role.entity';
import { Account_Role } from './account_role.entity';

export interface AccountCreateAttr {
  email: string;
  password: string;
  subname: string;
  name: string;
  middlename: string;
}

@Table({ tableName: 'account', createdAt: false, updatedAt: false })
export class Account extends Model<Account, AccountCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  subname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  middlename: string;

  @BelongsToMany(() => Role, () => Account_Role)
  roles: Role[];
}
