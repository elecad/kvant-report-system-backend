import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Programm } from '../programm/programm.model';

interface SchoolTypeCreateAttr {
  name: string;
}

@Table({ tableName: 'school_type', createdAt: false, updatedAt: false })
export class SchoolType extends Model<SchoolType, SchoolTypeCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: 1, description: 'ID Типа учреждения' })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'Школа',
    description: 'Наименование типа учреждения',
  })
  name: string;

  @HasMany(() => Programm)
  programms: Programm[];
}
