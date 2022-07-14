import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { STRINGS } from 'src/res/strings';

export class CreateDependencyDto {
  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsString({
    message: STRINGS.IsStringError,
  })
  name: string;

  @IsString({
    message: STRINGS.IsStringError,
  })
  short_name: string;

  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  dependency_type_id: number;
}
