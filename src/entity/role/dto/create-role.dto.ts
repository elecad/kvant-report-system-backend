import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';
import { isUnique } from 'src/validator/isUnique.validator';
import { Role } from '../role.model';

export class createRoleDto {
  @ApiProperty({
    example: 'Администратор',
    description: 'Наименование роли',
  })
  @IsString({
    message: 'Наименование роли должено быть строкой',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNotEmpty({
    message: 'Необходимо наименование роли',
    groups: [VALIDATOR_GROUP.base],
  })
  @Validate(
    isUnique,
    [{ model: Role, where: 'name' } as { model; where?: string }],
    {
      message: 'Роль с таким названием уже существует',
      groups: [VALIDATOR_GROUP.database],
    },
  )
  name: string;

  @ApiProperty({
    example: 'admin',
    description: 'Кодовое имя роли',
  })
  @IsString({
    message: 'Кодовое имя должено быть строкой',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNotEmpty({
    message: 'Необходимо Кодовое имя роли',
    groups: [VALIDATOR_GROUP.base],
  })
  @Validate(
    isUnique,
    [{ model: Role, where: 'code_name' } as { model; where?: string }],
    {
      message: 'Роль с таким кодовым названием уже существует',
      groups: [VALIDATOR_GROUP.database],
    },
  )
  code_name: string;

  @ApiProperty({
    example: 'Эта роль делает ...',
    description: 'Описание роли',
  })
  @IsString({
    message: 'Описание роли должено быть строкой',
    groups: [VALIDATOR_GROUP.base],
  })
  description: string;
}
