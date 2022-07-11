import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Account } from '../entities/account.entity';

export class CreateAccountDto {
  @IsNotEmpty({ message: 'Это обязательное поле' })
  @IsString({
    message: 'Это поле должно быть строкой',
  })
  @IsEmail(
    {},
    {
      message: 'Это поле должно быть корректной электронной почтой',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Это обязательное поле',
  })
  @IsString({
    message: 'Это поле должно быть строкой',
  })
  password: string;

  @IsString({
    message: 'Это поле должно быть строкой',
  })
  @IsNotEmpty({
    message: 'Это обязательное поле',
  })
  subname: string;

  @IsNotEmpty({
    message: 'Это обязательное поле',
  })
  @IsString({
    message: 'Это поле должно быть строкой',
  })
  name: string;

  @IsNotEmpty({
    message: 'Это обязательное поле',
  })
  @IsString({
    message: 'Это поле должно быть строкой',
  })
  middlename: string;

  // @IsArray()
  // @ValidateNested({})
  // @Type(() => Testing)
  // job: Testing[];
}

export class Testing {
  @IsNotEmpty({
    message: 'Это обязательное поле',
  })
  @IsPositive({
    message: 'ID должен быть положительным числом',
  })
  id: number;

  @IsNotEmpty({
    message: 'Это обязательное поле',
  })
  @IsString({
    message: 'Это поле должно быть строкой',
  })
  @IsEmail(
    {},
    {
      message: 'Это поле должно быть корректной электронной почтой',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Это обязательное поле',
  })
  @IsString({
    message: 'Это поле должно быть строкой',
  })
  value: string;
}
