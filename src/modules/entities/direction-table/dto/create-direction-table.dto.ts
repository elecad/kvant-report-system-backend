import { IsNotEmpty, IsString } from 'class-validator';
import { STRINGS } from 'src/res/strings';

export class CreateDirectionTableDto {
  @IsNotEmpty({ message: STRINGS.IsNotEmptyError })
  @IsString({
    message: STRINGS.IsStringError,
  })
  name: string;
}
