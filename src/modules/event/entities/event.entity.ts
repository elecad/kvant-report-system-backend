import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Dependency } from 'src/modules/dependency/entities/dependency.entity';

export interface EventCreateAttr {
  name: string;
  description: string;
  date: Date;
  dependency_id: number;
}

@Table({ tableName: 'event', createdAt: false, updatedAt: false })
export class Event extends Model<Event, EventCreateAttr> {
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
  @ForeignKey(() => Dependency)
  dependency_id: number;

  @BelongsTo(() => Dependency)
  dependency: Dependency;
}
