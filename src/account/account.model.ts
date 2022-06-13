import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permission } from 'src/permission/permission.model';
import { Role } from 'src/role/role.model';

interface AccountCreateAttr {
  mail: string;
  password: string;
  FIO: string;
}

@Table({ tableName: 'account' })
export class Account extends Model<Account, AccountCreateAttr> {
  @ApiProperty({ example: '1', description: 'ID Аккаунта' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'mail@mail.ru',
    description: 'Электронная почта аккаунта',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  mail: string;

  @ApiProperty({
    example: '123456789',
    description: 'Хэш пароля аккаунта',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: 'Макаренко Павел Сергеевич',
    description: 'ФИО пользовалетя аккаунта',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  FIO: string;

  @BelongsToMany(() => Role, () => Permission)
  permissions: Role[];
}
