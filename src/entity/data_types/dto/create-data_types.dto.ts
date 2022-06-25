import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';
import { isEnglish } from 'src/validator/isEnglish.validator';
import { isUnique } from 'src/validator/isUnique.validator';
import { DataTypes } from '../data_types.model';

export class createDataTypesDto {
  @IsString({ message: 'Наименование типа данных должно быть строкой' })
  @IsNotEmpty({ message: 'Необходимо наименование типа данных' })
  @Validate(isEnglish, {
    message:
      'Кодовое имя может сожержать только латинские буквы и нижнее подчёркивание',
    groups: [VALIDATOR_GROUP.base],
  })
  @Validate(isUnique, [{ model: DataTypes, where: 'code_name' }], {
    message: 'Кодовое имя должно быть уникальным',
    groups: [VALIDATOR_GROUP.database],
  })
  @ApiProperty({
    example: 't_2_3',
    description: 'Кодовое название типа данных',
  })
  code_name: string;

  @IsString({
    message: 'Описание типа данных должно быть строкой',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNotEmpty({
    message: 'Необходимо описание типа данных',
    groups: [VALIDATOR_GROUP.base],
  })
  @ApiProperty({
    example: 'Таблица 2 Колонка 3 ИЛИ Заголовок колонки',
    description: 'Описание типа данных',
  })
  description: string;
}
