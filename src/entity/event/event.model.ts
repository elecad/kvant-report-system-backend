import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Place } from '../place/place.model';

interface EventTypeCreateAttr {
  name: string;
  date: Date;
  description: string;
  place_id: number;
}

@Table({ tableName: 'event', createdAt: false, updatedAt: false })
export class Event extends Model<Event, EventTypeCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: 1, description: 'ID Мероприятия' })
  id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @ApiProperty({
    example: '2022-06-16T12:11:17.537Z',
    description: 'Дата проведения мероприятия',
  })
  date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'День робототехники',
    description: 'Наименование мероприятия',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'Мероприятие в честь...',
    description: 'Описание мероприятия',
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 1,
    description: 'ID Места проведения',
  })
  @ForeignKey(() => Place)
  place_id: number;

  @BelongsTo(() => Place)
  place: Place;
}
