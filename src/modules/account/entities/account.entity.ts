import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Answer } from 'src/modules/answer/entities/answer.entity';
import { Dependency } from 'src/modules/dependency/entities/dependency.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Session } from 'src/modules/session/entities/session.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { Account_Dependency } from './account_dependency.entity';
import { Account_Role } from './account_role.entity';

export interface AccountCreateAttr {
  email: string;
  password: string;
  surname: string;
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
  surname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  middlename: string;

  @BelongsToMany(() => Role, () => Account_Role)
  roles: Role[];

  @BelongsToMany(() => Dependency, () => Account_Dependency)
  dependencies: Dependency[];

  @HasMany(() => Session)
  sessions: Session[];

  @HasMany(() => Task)
  created_tasks: Task[];

  @HasMany(() => Answer)
  created_answers: Answer[];
}
