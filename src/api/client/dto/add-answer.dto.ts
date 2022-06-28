import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  isArray,
  IsNotEmpty,
  IsPositive,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Task } from 'src/entity/task/task.model';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';
import { isHasDB } from 'src/validator/isHasDB.validator';
import { addAnswerMainDto } from './add-answer_main.dto';

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

  // @ValidateNested({ each: true })
  // answer: addAnswerMainDto[];

  // @ValidateNested({ each: true, groups: [VALIDATOR_GROUP.base] })
  // @IsInstance(addAnswerMainDto, { groups: [VALIDATOR_GROUP.base], each: true })
  // @IsNotEmpty({ groups: [VALIDATOR_GROUP.base] })

  // @IsNotEmptyObject({}, { groups: [VALIDATOR_GROUP.base], each: true })
  // @IsObject({ groups: [VALIDATOR_GROUP.base] })
  // @ValidateNested({ groups: [VALIDATOR_GROUP.base], each: true })
  // @Type(() => addAnswerMainDto)

  @IsArray({ groups: [VALIDATOR_GROUP.base] })
  @ValidateNested({ each: true, groups: [VALIDATOR_GROUP.base] })
  @Type(() => addAnswerMainDto)
  answer: addAnswerMainDto[];
}
