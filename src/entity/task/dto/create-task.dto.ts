import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Validate,
} from 'class-validator';
import { Account } from 'src/entity/account/account.model';
import { Direction } from 'src/entity/direction/direction.model';
import { Place } from 'src/entity/place/place.model';
import { SchoolType } from 'src/entity/school_type/school_type.model';
import { isHalfYear } from 'src/validator/isHalfYear.validator';
import { isHasDB } from 'src/validator/isHasDB.validator';
import { isUnique } from 'src/validator/isUnique.validator';

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
