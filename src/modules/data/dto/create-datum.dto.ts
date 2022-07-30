import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { STRINGS } from 'src/res/strings';

export class CreateDatumDto {
  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  value: number;

  @IsNotEmpty({
    message: STRINGS.IsNotEmptyError,
  })
  @IsPositive({
    message: STRINGS.IsPositiveError,
  })
  @IsInt({ message: STRINGS.IsIntError })
  data_of_type_id: number;
}
