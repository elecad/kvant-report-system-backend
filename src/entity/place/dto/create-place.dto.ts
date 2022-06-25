import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { VALIDATOR_GROUP } from 'src/pipes/validator.pipe';

export class createPlaceDto {
  @ApiProperty({
    example: 'Алексеевский район',
    description: 'Наименование района или места дополнительного образования',
  })
  @IsString({
    message: 'Наименование места должно быть строкой',
    groups: [VALIDATOR_GROUP.base],
  })
  @IsNotEmpty({
    message: 'Необходимо наименование места',
    groups: [VALIDATOR_GROUP.base],
  })
  name: string;
}
