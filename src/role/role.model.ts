import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RoleCreateAttr {
  name: string;
}

@Table({ tableName: 'role' })
export class Role extends Model<Role, RoleCreateAttr> {
  @ApiProperty({ example: '1', description: 'ID Роли' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Администратор',
    description: 'Наименование роли',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Эта роль делает ...',
    description: 'Описание роли',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;
}
