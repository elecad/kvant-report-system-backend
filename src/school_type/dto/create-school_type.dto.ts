import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createSchoolTypeDto {
  @ApiProperty({
    example: 'Школа',
    description: 'Наименование типа учреждения',
  })
  @IsString({ message: 'Наименование типа учреждения должно быть строкой' })
  @IsNotEmpty({ message: 'Необходимо наименование типа учреждения' })
  name: string;
}
