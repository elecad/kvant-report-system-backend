import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { DataTypes } from '../data_types/data_types.model';
import { Place } from '../place/place.model';

interface PlaceTypeCreateAttr {
  name: string;
}

@Table({ tableName: 'place_type' })
export class PlaceType extends Model<PlaceType, PlaceTypeCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: 1, description: 'ID Типа Места' })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'Район',
    description: 'Наименование типа места',
  })
  name: string;

  @HasMany(() => Place)
  places: Place[];

  @HasMany(() => DataTypes)
  data_type: DataTypes[];
}
