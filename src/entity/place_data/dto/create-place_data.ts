import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString, Validate } from 'class-validator';
import { Answer } from 'src/entity/answer/answer.model';
import { DataTypes } from 'src/entity/data_types/data_types.model';
import { Place } from 'src/entity/place/place.model';
import { Task } from 'src/entity/task/task.model';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';
import { isHasDB } from 'src/validator/isHasDB.validator';

export class createPlaceDataDto {
  @IsPositive({
    message: 'Значение данных должно положительным числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNotEmpty({
    message: 'Необходимо значение данных',
    groups: [VALIDATOR_GROUP.base],
  })
  @ApiProperty({
    example: 25,
    description: 'Значение данных',
  })
  value: number;

  @IsPositive({
    message: 'ID Места должно быть положительным числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNotEmpty({
    message: 'Необходимо ID Места',
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

  @IsPositive({
    message: 'ID Типа данных должно быть положительным числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNotEmpty({
    message: 'Необходимо ID Типа данных',
    groups: [VALIDATOR_GROUP.base],
  })
  @Validate(isHasDB, [{ model: DataTypes } as { model; where?: string }], {
    message: 'Тип данных с таким ID не найден',
    groups: [VALIDATOR_GROUP.database],
  })
  @ApiProperty({
    example: 1,
    description: 'ID Типа данных',
  })
  data_type_id: number;

  @IsPositive({
    message: 'ID Задания должно быть положительным числом',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNotEmpty({
    message: 'Необходимо ID Задания',
    groups: [VALIDATOR_GROUP.base],
  })
  @Validate(isHasDB, [{ model: Answer } as { model; where?: string }], {
    message: 'Ответа с таким ID не найдено',
    groups: [VALIDATOR_GROUP.database],
  })
  @ApiProperty({
    example: 1,
    description: 'ID Ответа',
  })
  answer_id: number;
}
