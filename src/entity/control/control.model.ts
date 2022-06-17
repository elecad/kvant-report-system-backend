import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/entity/account/account.model';
import { Place } from '../place/place.model';

interface ControlCreateAttr {
  account_id: number;
  place_id: number;
}

@Table({ tableName: 'control' })
export class Control extends Model<Control, ControlCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: 1, description: 'ID Управления аккаунта над местом' })
  id: number;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 1,
    description: 'Внешний ключ на Аккаунт',
  })
  account_id: number;

  @ForeignKey(() => Place)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 1,
    description: 'Внешний ключ на Место',
  })
  place_id: number;
}
