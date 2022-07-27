import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { STRINGS } from 'src/res/strings';

export class LoginAuthDto {
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

  @IsNotEmpty({ message: STRINGS.IsNotEmptyError })
  @IsString({
    message: STRINGS.IsStringError,
  })
  password: string;
}
