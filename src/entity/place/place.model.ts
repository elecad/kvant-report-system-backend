import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from '../account/account.model';
import { Control } from '../control/control.model';
import { Event } from '../event/event.model';
import { PlaceType } from '../place_type/place_type.model';
import { Programm } from '../programm/programm.model';

interface PlaceCreateAttr {
  name: string;
}

@Table({ tableName: 'place' })
export class Place extends Model<Place, PlaceCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: 1, description: 'ID Места' })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'Алексеевский район',
    description: 'Наименование района или места дополнительного образования',
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => PlaceType)
  @ApiProperty({
    example: 1,
    description: 'Внешний ключ на Тип Места',
  })
  place_type_id: number;

  @HasMany(() => Event)
  events: Event[];

  @HasMany(() => Programm)
  programms: Programm[];

  @BelongsTo(() => PlaceType)
  type: PlaceType;

  @BelongsToMany(() => Account, () => Control)
  accounts: Account[];
}
