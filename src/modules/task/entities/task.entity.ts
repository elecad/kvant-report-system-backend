import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/modules/account/entities/account.entity';

export interface TaskCreateAttr {
  year: number;
  half_year: number;
  author_id: number;
}

@Table({ tableName: 'task', createdAt: false, updatedAt: false })
export class Task extends Model<Task, TaskCreateAttr> {
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
  @ForeignKey(() => Account)
  author_id: number;

  @BelongsTo(() => Account)
  author: Account;
}
