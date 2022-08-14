import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DependencyTable } from '../../dependency-table/entities/dependency-table.entity';

export interface EventTableCreateAttr {
  name: string;
  description: string;
  date: Date;
  dependency_id: number;
}

@Table({ tableName: 'event', createdAt: false, updatedAt: false })
export class EventTable extends Model<EventTable, EventTableCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => DependencyTable)
  dependency_id: number;

  @BelongsTo(() => DependencyTable)
  dependency: DependencyTable;
}
