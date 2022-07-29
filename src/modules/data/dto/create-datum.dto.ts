import { IsNotEmpty, IsPositive } from 'class-validator';
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
  data_of_type_id: number;
}
