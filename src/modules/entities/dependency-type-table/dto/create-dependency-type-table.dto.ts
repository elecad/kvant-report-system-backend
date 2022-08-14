import { IsNotEmpty, IsString } from 'class-validator';
import { STRINGS } from 'src/res/strings';

export class CreateDependencyTypeTableDto {
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
  code_name: string;
}
