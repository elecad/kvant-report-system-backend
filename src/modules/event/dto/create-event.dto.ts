import {
  IsDateString,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import { STRINGS } from 'src/res/strings';

export class CreateEventDto {
  @IsNotEmpty({ message: STRINGS.IsNotEmptyError })
  @IsString({
    message: STRINGS.IsStringError,
  })
  name: string;

  @IsNotEmpty({ message: STRINGS.IsNotEmptyError })
  @IsString({
    message: STRINGS.IsStringError,
  })
  description: string;

  @IsNotEmpty({ message: STRINGS.IsNotEmptyError })
  @IsDateString({}, { message: STRINGS.IsDateStringError })
  date: string;

  @IsNotEmpty({ message: STRINGS.IsNotEmptyError })
  @IsPositive({ message: STRINGS.IsPositiveArrayError })
  dependency_id: number;
}
