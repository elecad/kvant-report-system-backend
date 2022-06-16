import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createPlaceDto {
  @ApiProperty({
    example: 'Алексеевский район',
    description: 'Наименование района или места дополнительного образования',
  })
  @IsString({ message: 'Наименование места должно быть строкой' })
  @IsNotEmpty({ message: 'Необходимо наименование места' })
  name: string;
}
