import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

  // @Column({ type: DataType.INTEGER, allowNull: false })
  // @ForeignKey(() => Task)
  // task_id: number;

  // @BelongsTo(() => Task)
  // task: Task;
}
