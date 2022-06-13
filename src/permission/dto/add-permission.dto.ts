import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class addPermissionDto {
  @ApiProperty({
    example: 'mail@mail.ru',
    description: 'Электронная почта аккаунта, к которому добавляется роль',
  })
  @IsString({ message: 'Электронная почта должна быть строкой' })
  @IsEmail({}, { message: 'Некорректная электронная почта' })
  @IsNotEmpty({ message: 'Необходима электронная почта' })
  mail: string;

  @ApiProperty({
    example: 'Администратор',
    description: 'Наименование роли',
  })
  @IsString({ message: 'Наименование должно быть строкой' })
  @IsNotEmpty({ message: 'Необходимо наименование' })
  name: string;
}
