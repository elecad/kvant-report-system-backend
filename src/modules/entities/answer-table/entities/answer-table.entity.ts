import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { AccountTable } from '../../account-table/entities/account-table.entity';
import { TaskTable } from '../../task-table/entities/task-table.entity';

export interface AnswerTableCreateAttr {
  responder_id: number;
  task_id: number;
}

@Table({ tableName: 'answer', updatedAt: false })
export class AnswerTable extends Model<AnswerTable, AnswerTableCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => AccountTable)
  responder_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => TaskTable)
  task_id: number;

  @BelongsTo(() => AccountTable)
  responder: AccountTable;

  @BelongsTo(() => TaskTable)
  task: TaskTable;

  // @HasMany(() => AboutDependency)
  // about_dependencies: AboutDependency[];

  // @HasMany(() => AboutProgramm)
  // about_programms: AboutProgramm[];
}
