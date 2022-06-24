import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginDto {
  @ApiProperty({
    example: 'mail@mail.ru',
    description: 'Электронная почта',
  })
  @IsString({ message: 'Электронная почта должна быть строкой' })
  @IsEmail({}, { message: 'Некорректная электронная почта' })
  @IsNotEmpty({ message: 'Необходима электронная почта' })
  mail: string;

  @ApiProperty({
    example: '123456789',
    description: 'Пароль',
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Необходим пароль' })
  password: string;
}