import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { isUnique } from 'src/validator/isUnique.validator';
import { Account } from '../account.model';

export class createAccountDto {
  @ApiProperty({
    example: 'mail@mail.ru',
    description: 'Электронная почта',
  })
  @IsString({ message: 'Электронная почта должна быть строкой' })
  @IsEmail({}, { message: 'Некорректная электронная почта' })
  @IsNotEmpty({ message: 'Необходима электронная почта' })
  @Validate(
    isUnique,
    [{ model: Account, where: 'mail' } as { model; where?: string }],
    {
      message: 'Аккаунт с такой электронной почтой уже существует',
    },
  )
  mail: string;

  @ApiProperty({
    example: '123456789',
    description: 'Пароль',
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Необходим пароль' })
  password: string;

  @ApiProperty({
    example: 'Макаренко Павел Сергеевич',
    description: 'ФИО',
  })
  @IsString({ message: 'ФИО должено быть строкой' })
  @IsNotEmpty({ message: 'Необходимо ФИО пользователя' })
  FIO: string;
}
