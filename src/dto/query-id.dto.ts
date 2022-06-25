import { IsNumberString } from 'class-validator';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';

export class queryIdDto {
  @IsNumberString(
    { no_symbols: true },
    {
      message: 'ID должен быть положительным числом',
      groups: [VALIDATOR_GROUP.base],
    },
  )
  id: number;
}
