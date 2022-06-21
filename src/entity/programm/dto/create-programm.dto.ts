import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Validate,
} from 'class-validator';
import { Direction } from 'src/entity/direction/direction.model';
import { Place } from 'src/entity/place/place.model';
import { SchoolType } from 'src/entity/school_type/school_type.model';
import { isHasDB } from 'src/validator/isHasDB.validator';
import { isUnique } from 'src/validator/isUnique.validator';

export class createProgrammDto {
  @IsString({ message: 'Наименование программы должено быть строкой' })
  @IsNotEmpty({ message: 'Необходимо наименование программы' })
  @ApiProperty({
    example: 'Робототехника',
    description: 'Наименование образовательной программы',
  })
  name: string;

  @IsNotEmpty({ message: 'Необходим ID Программы в системе АИС Навигатор' })
  @IsPositive({
    message:
      'ID Программы в системе АИС Навигатор должен быть положительным числом',
  })
  @ApiProperty({
    example: 123,
    description: 'ID Программы в системе АИС Навигатор',
  })
  navigator_id: number;

  @IsNotEmpty({ message: 'Необходим возраст начала обучения' })
  @IsPositive({
    message: 'Возраст начала обучения должен быть положительным числом',
  })
  @ApiProperty({
    example: 7,
    description: 'Возраст начала обучения',
  })
  start_age: number;

  @IsNotEmpty({ message: 'Необходим возраст конца обучения' })
  @IsPositive({
    message: 'Возраст конца обучения должен быть положительным числом',
  })
  @ApiProperty({
    example: 17,
    description: 'Возраст конца обучения',
  })
  end_age: number;

  @IsString({ message: 'Наименование учреждения должено быть строкой' })
  @IsNotEmpty({ message: 'Необходимо наименование учреждения' })
  @ApiProperty({
    example: 'Учреждение №3',
    description: 'Наименование образовательного учреждения',
  })
  school: string;

  @IsNotEmpty({ message: 'Необходимо ID Направления' })
  @IsPositive({
    message: 'ID Направления должен быть положительным числом',
  })
  @Validate(isHasDB, [{ model: Direction } as { model; where?: string }], {
    message: 'Направления с таким ID не найдено',
  })
  @ApiProperty({
    example: 1,
    description: 'ID Направления',
  })
  direction_id: number;

  @IsNotEmpty({ message: 'Необходимо ID Типа учреждения' })
  @IsPositive({
    message: 'ID Типа учреждения должен быть положительным числом',
  })
  @Validate(isHasDB, [{ model: SchoolType } as { model; where?: string }], {
    message: 'Типа учреждения с таким ID не найдено',
  })
  @ApiProperty({
    example: 1,
    description: 'ID Типа учреждения',
  })
  school_type_id: number;

  @IsNotEmpty({ message: 'Необходимо ID Места' })
  @IsPositive({
    message: 'ID Места должен быть положительным числом',
  })
  @Validate(isHasDB, [{ model: Place } as { model; where?: string }], {
    message: 'Места с таким ID не найдено',
  })
  @ApiProperty({
    example: 1,
    description: 'ID Места',
  })
  place_id: number;
}
