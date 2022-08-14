import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TaskTable } from '../../task-table/entities/task-table.entity';

export interface FileTableCreateAttr {
  name: string;
  path: string;
  task_id: number;
}

@Table({ tableName: 'file', updatedAt: false })
export class FileTable extends Model<FileTable, FileTableCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  path: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => TaskTable)
  task_id: number;

  @BelongsTo(() => TaskTable)
  task: TaskTable;
}
