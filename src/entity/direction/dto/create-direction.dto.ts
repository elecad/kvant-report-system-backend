import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createDirectionDto {
  @ApiProperty({
    example: 'Робототехника',
    description: 'Наименование направления',
  })
  @IsString({ message: 'Наименование направления должно быть строкой' })
  @IsNotEmpty({ message: 'Необходимо наименование направления' })
  name: string;
}
