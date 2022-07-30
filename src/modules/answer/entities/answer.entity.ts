import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { AboutDependency } from 'src/modules/about_dependency/entities/about_dependency.entity';
import { AboutProgramm } from 'src/modules/about_programm/entities/about_programm.entity';
import { Account } from 'src/modules/account/entities/account.entity';
import { Task } from 'src/modules/task/entities/task.entity';

export interface AnswerCreateAttr {
  responder_id: number;
  task_id: number;
}

@Table({ tableName: 'answer', updatedAt: false })
export class Answer extends Model<Answer, AnswerCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Account)
  responder_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Task)
  task_id: number;

  @BelongsTo(() => Account)
  responder: Account;

  @BelongsTo(() => Task)
  task: Task;

  @HasMany(() => AboutDependency)
  about_dependencies: AboutDependency[];

  @HasMany(() => AboutProgramm)
  about_programms: AboutProgramm[];
}
