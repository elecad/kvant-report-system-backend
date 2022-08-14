import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { AccountTable } from '../../account-table/entities/account-table.entity';
import { AnswerTable } from '../../answer-table/entities/answer-table.entity';
import { FileTable } from '../../file-table/entities/file-table.entity';

export interface TaskTableCreateAttr {
  year: number;
  half_year: number;
  author_id: number;
}

@Table({ tableName: 'task', createdAt: false, updatedAt: false })
export class TaskTable extends Model<TaskTable, TaskTableCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  year: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  half_year: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => AccountTable)
  author_id: number;

  @BelongsTo(() => AccountTable)
  author: AccountTable;

  @HasMany(() => FileTable)
  files: FileTable[];

  @HasMany(() => AnswerTable)
  answers: AnswerTable[];
}
