import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

import { DataType } from 'sequelize-typescript';

interface DataTypesCreateAttr {
  description: string;
  code_name: string;
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
}