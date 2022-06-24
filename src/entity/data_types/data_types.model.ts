import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { DataType } from 'sequelize-typescript';
import { PlaceData } from '../place_data/place_data.model';
import { PlaceType } from '../place_type/place_type.model';
import { ProgrammData } from '../programm_data/programm_data.model';

interface DataTypesCreateAttr {
  description: string;
  code_name: string;
  place_type_id: number;
}

@Table({ tableName: 'data_type' })
export class DataTypes extends Model<DataTypes, DataTypesCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: 1, description: 'ID Типа данных' })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  @ApiProperty({
    example: 't_2_3',
    description: 'Кодовое обозначение типа данных',
  })
  code_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'Таблица 2 Колонка 3 ИЛИ Заголовок колонки',
    description: 'Описание типа данных',
  })
  description: string;

  @ForeignKey(() => PlaceType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 1,
    description: 'Внешний ключ на Тип данных',
  })
  place_type_id: number;

  @HasMany(() => PlaceData)
  placeData: PlaceData[];

  @HasMany(() => ProgrammData)
  programmData: ProgrammData[];

  @BelongsTo(() => PlaceType)
  place_type: PlaceType;
}
