import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { isEnglish } from 'src/validator/isEnglish.validator';
import { isUnique } from 'src/validator/isUnique.validator';
import { DataTypes } from '../data_types.model';

export class createDataTypesDto {
  @IsString({ message: 'Наименование типа данных должно быть строкой' })
  @IsNotEmpty({ message: 'Необходимо наименование типа данных' })
  @Validate(isEnglish, {
    message:
      'Кодовое имя может сожержать только латинские буквы и нижнее подчёркивание',
  })
  @Validate(isUnique, [{ model: DataTypes, where: 'code_name' }], {
    message: 'Кодовое имя должно быть уникальным',
  })
  @ApiProperty({
    example: 't_2_3',
    description: 'Кодовое название типа данных',
  })
  code_name: string;

  @IsString({ message: 'Описание типа данных должно быть строкой' })
  @IsNotEmpty({ message: 'Необходимо описание типа данных' })
  @ApiProperty({
    example: 'Таблица 2 Колонка 3 ИЛИ Заголовок колонки',
    description: 'Описание типа данных',
  })
  description: string;
}
