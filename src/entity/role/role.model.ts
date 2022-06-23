import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/entity/account/account.model';
import { isEnglish } from 'src/validator/isEnglish.validator';
import { Permission } from '../permission/permission.model';

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
    example: 'ADMIN',
    description: 'Кодовое название роли',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @Validate(isEnglish, {
    message:
      'Кодовое имя может сожержать только латинские буквы и нижнее подчёркивание',
  })
  code_name: string;

  @ApiProperty({
    example: 'Эта роль делает ...',
    description: 'Описание роли',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @BelongsToMany(() => Account, () => Permission)
  permissions: Account[];
}
