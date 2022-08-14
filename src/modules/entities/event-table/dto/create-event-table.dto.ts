import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import { STRINGS } from 'src/res/strings';

export class CreateEventTableDto {
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
  date: Date;

  @IsNotEmpty({ message: STRINGS.IsNotEmptyError })
  @IsPositive({ message: STRINGS.IsPositiveError })
  @IsInt({ message: STRINGS.IsIntError })
  dependency_id: number;
}
