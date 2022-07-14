import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/modules/account/entities/account.entity';
import { Account_Role } from 'src/modules/account/entities/account_role.entity';

export interface RoleCreateAttr {
  name: string;
  code_name: string;
  description: string;
}

@Table({ tableName: 'role', createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  code_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => Account, () => Account_Role)
  accounts: Account[];
}
