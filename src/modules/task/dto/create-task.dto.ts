import { IsIn, IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { STRINGS } from 'src/res/strings';

export class CreateTaskDto {
  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  @IsInt({ message: STRINGS.IsIntError })
  year: number;

  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsIn([1, 2], { message: STRINGS.IsInHalfYearError })
  half_year: number;

  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  @IsInt({ message: STRINGS.IsIntError })
  author_id: number;
}
