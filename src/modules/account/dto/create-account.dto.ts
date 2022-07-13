import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { STRINGS } from 'src/res/strings';

export class CreateAccountDto {
  @IsNotEmpty({ message: STRINGS.IsNotEmptyError })
  @IsString({
    message: STRINGS.IsStringError,
  })
  @IsEmail(
    {},
    {
      message: STRINGS.IsEmailError,
    },
  )
  email: string;

  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsString({
    message: STRINGS.IsStringError,
  })
  password: string;

  @IsString({
    message: STRINGS.IsStringError,
  })
  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  subname: string;

  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsString({
    message: STRINGS.IsStringError,
  })
  name: string;

  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsString({
    message: STRINGS.IsStringError,
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
