import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Task } from 'src/modules/task/entities/task.entity';

export interface FileCreateAttr {
  name: string;
  path: string;
  task_id: number;
}

@Table({ tableName: 'file', updatedAt: false })
export class File extends Model<File, FileCreateAttr> {
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
  @ForeignKey(() => Task)
  task_id: number;

  @BelongsTo(() => Task)
  task: Task;
}
