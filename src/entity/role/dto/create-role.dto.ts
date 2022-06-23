import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { isUnique } from 'src/validator/isUnique.validator';
import { Role } from '../role.model';

export class createRoleDto {
  @ApiProperty({
    example: 'Администратор',
    description: 'Наименование роли',
  })
  @IsString({ message: 'Наименование роли должено быть строкой' })
  @IsNotEmpty({ message: 'Необходимо наименование роли' })
  @Validate(
    isUnique,
    [{ model: Role, where: 'name' } as { model; where?: string }],
    {
      message: 'Роль с таким названием уже существует',
    },
  )
  name: string;

  @ApiProperty({
    example: 'admin',
    description: 'Кодовое имя роли',
  })
  @IsString({ message: 'Кодовое имя должено быть строкой' })
  @IsNotEmpty({ message: 'Необходимо Кодовое имя роли' })
  @Validate(
    isUnique,
    [{ model: Role, where: 'code_name' } as { model; where?: string }],
    {
      message: 'Роль с таким названием уже существует',
    },
  )
  code_name: string;

  @ApiProperty({
    example: 'Эта роль делает ...',
    description: 'Описание роли',
  })
  @IsString({ message: 'Описание роли должено быть строкой' })
  description: string;
}
