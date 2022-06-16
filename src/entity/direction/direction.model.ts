import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface DirectionTypeCreateAttr {
  name: string;
}

@Table({ tableName: 'direction' })
export class Direction extends Model<Direction, DirectionTypeCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: 1, description: 'ID Направления' })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'Робототехника',
    description: 'Наименование направления',
  })
  name: string;
}
