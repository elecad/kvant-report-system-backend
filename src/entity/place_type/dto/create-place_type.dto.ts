import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createPlaceTypeDto {
  @ApiProperty({
    example: 'Школа',
    description: 'Наименование типа учреждения',
  })
  @IsString({ message: 'Наименование типа места должно быть строкой' })
  @IsNotEmpty({ message: 'Необходимо наименование типа места' })
  name: string;
}
