import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Answer } from '../answer/answer.model';
import { DataTypes } from '../data_types/data_types.model';
import { Place } from '../place/place.model';
import { Programm } from '../programm/programm.model';
import { Task } from '../task/task.model';

interface ProgrammDataTypeCreateAttr {
  value: number;
  data_type_id: number;
  place_id: number;
  task_id: number;
}

@Table({ tableName: 'programm_data', updatedAt: false })
export class ProgrammData extends Model<
  ProgrammData,
  ProgrammDataTypeCreateAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: 1, description: 'ID Данных о Программе' })
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
    description: 'ID Программы',
  })
  @ForeignKey(() => Programm)
  programm_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 1,
    description: 'ID Ответа',
  })
  @ForeignKey(() => Answer)
  answer_id: number;

  @BelongsTo(() => Programm)
  programm: Programm;

  @BelongsTo(() => DataTypes)
  type: Place;

  @BelongsTo(() => Answer)
  answer: Answer;
}
