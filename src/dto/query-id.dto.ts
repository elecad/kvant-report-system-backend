import { Validate } from 'class-validator';
import { isID } from 'src/validator/isID.validator';

export class queryIdDto {
  @Validate(isID)
  id: number;
}
