import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Control } from '../control/control.model';
import { Direction } from '../direction/direction.model';
import { Permission } from '../permission/permission.model';
import { Place } from '../place/place.model';
import { Role } from '../role/role.model';
import { SchoolType } from '../school_type/school_type.model';

interface ProgrammCreateAttr {
  name: string;
  navigator_id: number;
  start_age: number;
  end_age: number;
  school: string;
  direction_id: number;
  school_type_id: number;
  place_id: number;
}

@Table({ tableName: 'programm' })
export class Programm extends Model<Programm, ProgrammCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: 1, description: 'ID Образовательной программы' })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'Лепка пластелином',
    description: 'Наименование образовательной программы',
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 123,
    description: 'ID в системе АИС Навигатор',
  })
  navigator_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 12,
    description: 'Возраст начала преподавания образовательной программы',
  })
  start_age: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 17,
    description: 'Возраст конца преподавания образовательной программы',
  })
  end_age: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'Учреждение №3',
    description: 'Наименование образовательного учреждения',
  })
  school: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Direction)
  @ApiProperty({
    example: 1,
    description: 'ID Направления',
  })
  direction_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Place)
  @ApiProperty({
    example: 1,
    description: 'ID Места',
  })
  place_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => SchoolType)
  @ApiProperty({
    example: 1,
    description: 'ID Места',
  })
  school_type_id: number;

  @BelongsTo(() => Place)
  place: Place;

  @BelongsTo(() => Direction)
  direction: Direction;

  @BelongsTo(() => SchoolType)
  school_type: SchoolType;
}
