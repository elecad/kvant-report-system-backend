import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString, Validate } from 'class-validator';
import { DataTypes } from 'src/entity/data_types/data_types.model';
import { Place } from 'src/entity/place/place.model';
import { Task } from 'src/entity/task/task.model';
import { isHasDB } from 'src/validator/isHasDB.validator';

export class createPlaceDataDto {
  @IsPositive({ message: 'Значение данных должно положительным числом' })
  @IsNotEmpty({ message: 'Необходимо значение данных' })
  @ApiProperty({
    example: 25,
    description: 'Значение данных',
  })
  value: number;

  @IsPositive({ message: 'ID Места должно быть положительным числом' })
  @IsNotEmpty({ message: 'Необходимо ID Места' })
  @Validate(isHasDB, [{ model: Place } as { model; where?: string }], {
    message: 'Места с таким ID не найдено',
  })
  @ApiProperty({
    example: 1,
    description: 'ID Места',
  })
  place_id: number;

  @IsPositive({ message: 'ID Типа данных должно быть положительным числом' })
  @IsNotEmpty({ message: 'Необходимо ID Типа данных' })
  @Validate(isHasDB, [{ model: DataTypes } as { model; where?: string }], {
    message: 'Тип данных с таким ID не найден',
  })
  @ApiProperty({
    example: 1,
    description: 'ID Типа данных',
  })
  data_type_id: number;

  @IsPositive({ message: 'ID Задания должно быть положительным числом' })
  @IsNotEmpty({ message: 'Необходимо ID Задания' })
  @Validate(isHasDB, [{ model: Task } as { model; where?: string }], {
    message: 'Задание с таким ID не найдено',
  })
  @ApiProperty({
    example: 1,
    description: 'ID Задания',
  })
  task_id: number;
}
