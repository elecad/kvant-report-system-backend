import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';

export class createPlaceTypeDto {
  @ApiProperty({
    example: 'Школа',
    description: 'Наименование типа учреждения',
  })
  @IsString({
    message: 'Наименование типа места должно быть строкой',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNotEmpty({
    message: 'Необходимо наименование типа места',
    groups: [VALIDATOR_GROUP.base],
  })
  name: string;
}
