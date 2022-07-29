import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
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
}
