import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/entity/account/account.model';
import { Role } from '../role/role.model';

interface PermissionCreateAttr {
  role_id: number;
  account_id: number;
}

@Table({ tableName: 'permission', createdAt: false, updatedAt: false })
export class Permission extends Model<Permission, PermissionCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: 1, description: 'ID Полномочия' })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Role)
  @ApiProperty({
    example: 1,
    description: 'Внешний ключ на Роль',
  })
  role_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Account)
  @ApiProperty({
    example: 1,
    description: 'Внешний ключ на Аккаунт',
  })
  account_id: number;
}
