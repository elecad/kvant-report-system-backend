import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from '../data_types/data_types.model';
import { Place } from '../place/place.model';
import { Task } from '../task/task.model';

interface PlaceDataTypeCreateAttr {
  value: number;
  data_type_id: number;
  place_id: number;
  task_id: number;
}

@Table({ tableName: 'place_data' })
export class PlaceData extends Model<PlaceData, PlaceDataTypeCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: 1, description: 'ID Данных о Месте' })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 47,
    description: 'Значение',
  })
  value: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 1,
    description: 'ID Типа данных',
  })
  @ForeignKey(() => DataTypes)
  data_type_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 1,
    description: 'ID Места',
  })
  @ForeignKey(() => Place)
  place_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 1,
    description: 'ID Задания',
  })
  @ForeignKey(() => Task)
  task_id: number;

  @BelongsTo(() => Place)
  place: Place;

  @BelongsTo(() => DataTypes)
  type: Place;

  @BelongsTo(() => Task)
  task: Task;
}
