import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';

export class addPermissionDto {
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
    description: 'ID Роли',
  })
  @IsNotEmpty({ message: 'Необходим ID Роли', groups: [VALIDATOR_GROUP.base] })
  @IsPositive({
    message: 'ID должен быть положительным числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNumber(
    { allowNaN: false },
    { message: 'ID должен быть числом', groups: [VALIDATOR_GROUP.base] },
  )
  role_id: number;
}
