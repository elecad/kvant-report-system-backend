import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Validate } from 'class-validator';
import { Task } from 'src/entity/task/task.model';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';
import { isHasDB } from 'src/validator/isHasDB.validator';

export class getPlaceAnswerDto {
  @ApiProperty({
    example: 1,
    description: 'ID Задания',
  })
  @Validate(isHasDB, [{ model: Task } as { model; where?: string }], {
    message: 'Задание с таким ID не найдено',
    groups: [VALIDATOR_GROUP.database],
  })
  @IsNumberString(
    { no_symbols: true },
    {
      message: 'ID должен быть положительным числом',
      groups: [VALIDATOR_GROUP.base],
    },
  )
  task_id: number;
}
