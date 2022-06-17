import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Event } from '../event/event.model';

interface PlaceCreateAttr {
  name: string;
}

@Table({ tableName: 'place' })
export class Place extends Model<Place, PlaceCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
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

  @HasMany(() => Event)
  events: Event[];
}
