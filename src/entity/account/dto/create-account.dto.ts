import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';
import { isUnique } from 'src/validator/isUnique.validator';
import { Account } from '../account.model';

export class createAccountDto {
  @ApiProperty({
    example: 'mail@mail.ru',
    description: 'Электронная почта',
  })
  @IsString({
    message: 'Электронная почта должна быть строкой',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsEmail(
    {},
    {
      message: 'Некорректная электронная почта',
      groups: [VALIDATOR_GROUP.base],
    },
  )
  @IsNotEmpty({
    message: 'Необходима электронная почта',
    groups: [VALIDATOR_GROUP.base],
  })
  @Validate(
    isUnique,
    [{ model: Account, where: 'mail' } as { model; where?: string }],
    {
      message: 'Аккаунт с такой электронной почтой уже существует',
      groups: [VALIDATOR_GROUP.database],
    },
  )
  mail: string;

  @ApiProperty({
    example: '123456789',
    description: 'Пароль',
  })
  @IsString({
    message: 'Пароль должен быть строкой',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNotEmpty({ message: 'Необходим пароль', groups: [VALIDATOR_GROUP.base] })
  password: string;

  @ApiProperty({
    example: 'Макаренко Павел Сергеевич',
    description: 'ФИО',
  })
  @IsString({
    message: 'ФИО должено быть строкой',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNotEmpty({
    message: 'Необходимо ФИО пользователя',
    groups: [VALIDATOR_GROUP.base],
  })
  FIO: string;
}
