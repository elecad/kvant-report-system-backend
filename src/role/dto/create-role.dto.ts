import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createRoleDto {
  @ApiProperty({
    example: 'Администратор',
    description: 'Наименование роли',
  })
  @IsString({ message: 'Наименование роли должено быть строкой' })
  @IsNotEmpty({ message: 'Необходимо наименование роли' })
  name: string;

  @ApiProperty({
    example: 'Эта роль делает ...',
    description: 'Описание роли',
  })
  @IsString({ message: 'Описание роли должено быть строкой' })
  description: string;
}
