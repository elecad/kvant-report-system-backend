import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsPositive,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { DataTypes } from 'src/entity/data_types/data_types.model';
import { Place } from 'src/entity/place/place.model';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';
import { isHasDB } from 'src/validator/isHasDB.validator';
import { addAnswerProgrammDto } from './add-answer_programm.dto';

export class addAnswerMainDto {
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

  @IsArray({ groups: [VALIDATOR_GROUP.base] })
  @ValidateNested({ each: true, groups: [VALIDATOR_GROUP.base] })
  @Type(() => addAnswerProgrammDto)
  programm: addAnswerProgrammDto[];
}
