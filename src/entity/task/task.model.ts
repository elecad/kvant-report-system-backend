import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from '../account/account.model';
import { PlaceData } from '../place_data/place_data.model';
import { ProgrammData } from '../programm_data/programm_data.model';

interface TaskCreateAttr {
  half_year: number;
  year: number;
  account_id: number;
}

@Table({ tableName: 'task' })
export class Task extends Model<Task, TaskCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: 1, description: 'ID Задания' })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 2,
    description: 'Полугодие для Задания',
  })
  half_year: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 2022,
    description: 'Год для Задания',
  })
  year: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Account)
  @ApiProperty({
    example: 1,
    description: 'ID Аккаунта создателя задания',
  })
  account_id: number;

  @BelongsTo(() => Account)
  account: Account;
}
