import { IsNotEmpty, IsPositive } from 'class-validator';
import { STRINGS } from 'src/res/strings';

export class CreateAboutProgrammDto {
  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  answer_id: number;

  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  programm_id: number;

  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  data_id: number;
}
