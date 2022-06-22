import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, Validate } from 'class-validator';
import { Account } from 'src/entity/account/account.model';
import { isHalfYear } from 'src/validator/isHalfYear.validator';
import { isHasDB } from 'src/validator/isHasDB.validator';

export class createTaskDto {
  @IsNotEmpty({ message: 'Необходимо Полугодие для задания' })
  @IsPositive({
    message: 'Полугодие должно быть числом',
  })
  @Validate(isHalfYear, {
    message: 'Некорректное значение полугодия',
  })
  @ApiProperty({
    example: 2,
    description: 'Полугодие (1 или 2)',
  })
  half_year: number;

  @IsNotEmpty({ message: 'Необходимо Полугодие для задания' })
  @IsPositive({
    message: 'Полугодие должно быть числом',
  })
  @ApiProperty({
    example: 2022,
    description: 'Год',
  })
  year: number;

  @IsNotEmpty({ message: 'Необходим ID Аккаунта' })
  @IsPositive({
    message: 'ID Аккаунта должен быть положительным числом',
  })
  @Validate(isHasDB, [{ model: Account } as { model; where?: string }], {
    message: 'Аккаунт с таким ID не найден',
  })
  @ApiProperty({
    example: 1,
    description: 'ID Аккаунта',
  })
  account_id: number;
}
