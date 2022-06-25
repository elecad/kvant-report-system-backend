import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';

export class addControlDto {
  @ApiProperty({
    example: 1,
    description: 'ID Аккаунта',
  })
  @IsNotEmpty({
    message: 'Необходим ID Аккаунта',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsPositive({
    message: 'ID должен быть положительным числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNumber(
    { allowNaN: false },
    { message: 'ID должен быть числом', groups: [VALIDATOR_GROUP.base] },
  )
  account_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID Места',
  })
  @IsNotEmpty({ message: 'Необходим ID Места' })
  @IsPositive({
    message: 'ID должен быть положительным числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNumber(
    { allowNaN: false },
    { message: 'ID должен быть числом', groups: [VALIDATOR_GROUP.base] },
  )
  place_id: number;
}
