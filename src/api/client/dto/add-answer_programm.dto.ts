import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, Validate } from 'class-validator';
import { Programm } from 'src/entity/programm/programm.model';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';
import { isHasDB } from 'src/validator/isHasDB.validator';

export class addAnswerProgrammDto {
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
