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
    example: 'Эта роль делает ...',
    description: 'Описание роли',
  })
  @IsString({ message: 'Описание роли должено быть строкой' })
  description: string;
}
