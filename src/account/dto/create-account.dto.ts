import { ApiProperty } from '@nestjs/swagger';

export class createAccountDto {
  @ApiProperty({
    example: 'mail@mail.ru',
    description: 'Электронная почта',
  })
  mail: string;

  @ApiProperty({
    example: '123456789',
    description: 'Пароль',
  })
  password: string;

  @ApiProperty({
    example: 'Макаренко Павел Сергеевич',
    description: 'ФИО',
  })
  FIO: string;
}
