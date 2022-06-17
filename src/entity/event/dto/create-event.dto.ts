import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsPositive,
  IsString,
  Validate,
} from 'class-validator';
import { Place } from 'src/entity/place/place.model';
import { isHasDB } from 'src/validator/isHasDB.validator';

export class createEventDto {
  @IsString({ message: 'Наименование мероприятия должно быть строкой' })
  @IsNotEmpty({ message: 'Необходимо наименование мероприятия' })
  @ApiProperty({
    example: 'День рождения Николы Тесла',
    description: 'Наименование мероприятия',
  })
  name: string;

  @IsDateString({}, { message: 'Это поле должно быть датой' })
  @IsNotEmpty({ message: 'Необходимо дата и время проведения мероприятия' })
  @ApiProperty({
    example: '2022-06-16T12:11:17.537Z',
    description: 'Дата и время проведения мероприятия',
  })
  date: Date;

  @IsString({ message: 'Описание мероприятия должно быть строкой' })
  @IsNotEmpty({ message: 'Необходимо описание проведения мероприятия' })
  @ApiProperty({
    example: 'На мероприятии дети занимались робототехникой',
    description: 'Описание мероприятия',
  })
  description: string;

  @IsPositive({ message: 'ID Места должно быть положительным числом' })
  @IsNotEmpty({ message: 'Необходимо ID Места проведения мероприятия' })
  @Validate(isHasDB, [{ model: Place } as { model; where?: string }], {
    message: 'Места с таким ID не найдено',
  })
  @ApiProperty({
    example: 1,
    description: 'ID Места проведения Мероприятия',
  })
  place_id: number;
}
