import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { DependencyTable } from '../../dependency-table/entities/dependency-table.entity';
import { RoleTable } from '../../role-table/entities/role-table.entity';
import { SessionTable } from '../../session-table/entities/session-table.entity';
import { Account_DependencyTable } from './account_dependency-table.entity';
import { Account_RoleTable } from './account_role-table.entity';

export interface AccountTableCreateAttr {
  email: string;
  password: string;
  surname: string;
  name: string;
  middlename: string;
}

@Table({ tableName: 'account', createdAt: false, updatedAt: false })
export class AccountTable extends Model<AccountTable, AccountTableCreateAttr> {
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
  surname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  middlename: string;

  @BelongsToMany(() => RoleTable, () => Account_RoleTable)
  roles: RoleTable[];

  @BelongsToMany(() => DependencyTable, () => Account_DependencyTable)
  dependencies: DependencyTable[];

  @HasMany(() => SessionTable)
  sessions: SessionTable[];

  // @HasMany(() => Task)
  // created_tasks: Task[];

  // @HasMany(() => Answer)
  // created_answers: Answer[];
}
