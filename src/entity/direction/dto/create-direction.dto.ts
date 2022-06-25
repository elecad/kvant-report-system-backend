import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';

export class createDirectionDto {
  @ApiProperty({
    example: 'Робототехника',
    description: 'Наименование направления',
  })
  @IsString({
    message: 'Наименование направления должно быть строкой',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNotEmpty({
    message: 'Необходимо наименование направления',
    groups: [VALIDATOR_GROUP.base],
  })
  name: string;
}
