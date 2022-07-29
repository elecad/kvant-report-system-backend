import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { STRINGS } from 'src/res/strings';

export class CreateFileDto {
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
  path: string;

  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  task_id: number;
}
