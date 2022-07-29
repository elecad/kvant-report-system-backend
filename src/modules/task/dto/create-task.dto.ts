import { IsIn, IsNotEmpty, IsPositive } from 'class-validator';
import { STRINGS } from 'src/res/strings';

export class CreateTaskDto {
  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
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
  author_id: number;
}
