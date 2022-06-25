import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';

export class loginDto {
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
}
