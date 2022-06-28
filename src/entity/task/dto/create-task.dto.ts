import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, Validate } from 'class-validator';
import { Account } from 'src/entity/account/account.model';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';
import { isHalfYear } from 'src/validator/isHalfYear.validator';
import { isHasDB } from 'src/validator/isHasDB.validator';

export class createTaskDto {
  @IsNotEmpty({
    message: 'Необходимо Полугодие для задания',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsPositive({
    message: 'Полугодие должно быть числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @Validate(isHalfYear, {
    message: 'Некорректное значение полугодия',
    groups: [VALIDATOR_GROUP.base],
  })
  @ApiProperty({
    example: 2,
    description: 'Полугодие (1 или 2)',
  })
  half_year: number;

  @IsNotEmpty({
    message: 'Необходимо Полугодие для задания',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsPositive({
    message: 'Гол должен быть числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @ApiProperty({
    example: 2022,
    description: 'Год',
  })
  year: number;

  @IsNotEmpty({
    message: 'Необходим ID Аккаунта',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsPositive({
    message: 'ID Аккаунта должен быть положительным числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @Validate(isHasDB, [{ model: Account } as { model; where?: string }], {
    message: 'Аккаунт с таким ID не найден',
    groups: [VALIDATOR_GROUP.database],
  })
  @ApiProperty({
    example: 1,
    description: 'ID Аккаунта',
  })
  account_id: number;
}
