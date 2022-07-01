import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInstance,
  IsNotEmpty,
  IsPositive,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { DataTypes } from 'src/entity/data_types/data_types.model';
import { Place } from 'src/entity/place/place.model';
import { Programm } from 'src/entity/programm/programm.model';
import { Task } from 'src/entity/task/task.model';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';
import { isHasDB } from 'src/validator/isHasDB.validator';

export class placeDataDto {
  @IsString({
    message: 'Наименование должено быть строкой',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNotEmpty({
    message: 'Необходимо наименование',
    groups: [VALIDATOR_GROUP.base],
  })
  @Validate(
    isHasDB,
    [{ model: DataTypes, where: 'code_name' } as { model; where?: string }],
    {
      message: 'Типа данных с таким кодовым именем не найдено',
      groups: [VALIDATOR_GROUP.database],
    },
  )
  @ApiProperty({
    example: 't2_c3',
    description: 'Кодовое наименование типа данных',
  })
  code_name: string;

  @IsNotEmpty({
    message: 'Необходимо значение',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsPositive({
    message: 'Значение должено быть положительным числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @ApiProperty({
    example: 1,
    description: 'Значение',
  })
  value: number;
}

export class programmDataDto {
  @IsNotEmpty({
    message: 'Необходимо ID Программы',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsPositive({
    message: 'ID Программы должено быть положительным числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @Validate(isHasDB, [{ model: Programm } as { model; where?: string }], {
    message: 'Программы с таким ID не найдено',
    groups: [VALIDATOR_GROUP.database],
  })
  @ApiProperty({
    example: 1,
    description: 'ID Программы',
  })
  programm_id: number;

  @IsNotEmpty({
    message: 'Необходимо значение',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsPositive({
    message: 'Значение должено быть положительным числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @ApiProperty({
    example: 1,
    description: 'Значение',
  })
  value: number;
}

export class addAnswerDto {
  @IsNotEmpty({
    message: 'Необходимо ID',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsPositive({
    message: 'ID должено быть положительным числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @Validate(isHasDB, [{ model: Task } as { model; where?: string }], {
    message: 'Сущности с таким ID не найдено',
    groups: [VALIDATOR_GROUP.database],
  })
  @ApiProperty({
    example: 1,
    description: 'ID Задания',
  })
  task_id: number;

  @IsArray({ groups: [VALIDATOR_GROUP.base] })
  @ValidateNested({ each: true, groups: [VALIDATOR_GROUP.base] })
  @Type(() => answerDataDto)
  answer: answerDataDto[];
}

export class answerDataDto {
  @IsNotEmpty({
    message: 'Необходимо ID Места',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsPositive({
    message: 'ID Места должено быть положительным числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @Validate(isHasDB, [{ model: Place } as { model; where?: string }], {
    message: 'Места с таким ID не найдено',
    groups: [VALIDATOR_GROUP.database],
  })
  @ApiProperty({
    example: 1,
    description: 'ID Места',
  })
  place_id: number;

  @IsArray({
    message: 'Данные о местах должны быть массивом',
    groups: [VALIDATOR_GROUP.base],
  })
  @ValidateNested({ each: true, groups: [VALIDATOR_GROUP.base] })
  @Type(() => placeDataDto)
  place_data: placeDataDto[];

  @IsArray({
    message: 'Данные о программах должны быть массивом',
    groups: [VALIDATOR_GROUP.base],
  })
  @ValidateNested({ each: true, groups: [VALIDATOR_GROUP.base] })
  @Type(() => programmDataDto)
  programm_data: programmDataDto[];
}
