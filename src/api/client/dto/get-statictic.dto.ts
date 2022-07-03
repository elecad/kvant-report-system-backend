import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumberString, Validate } from 'class-validator';
import { Task } from 'src/entity/task/task.model';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';
import { isHasDB } from 'src/validator/isHasDB.validator';

export class getStatistics {
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

  @ApiProperty({
    example: 1,
    description: 'Тип отчёта',
  })
  @IsNumberString(
    { no_symbols: true },
    {
      message: 'ID должен быть положительным числом',
      groups: [VALIDATOR_GROUP.base],
    },
  )
  @IsIn(['1', '2', '3'], {
    message: 'Тип отчёта некорректен',
    groups: [VALIDATOR_GROUP.base],
  })
  type: number;
}
