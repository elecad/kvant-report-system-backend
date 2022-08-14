import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { AboutDependencyTable } from '../../about-dependency-table/entities/about-dependency-table.entity';
import { AboutProgrammTable } from '../../about-programm-table/entities/about-programm-table.entity';
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

  @HasMany(() => AboutDependencyTable)
  about_dependencies: AboutDependencyTable[];

  @HasMany(() => AboutProgrammTable)
  about_programms: AboutProgrammTable[];
}
