import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class addControlDto {
  @ApiProperty({
    example: 1,
    description: 'ID Аккаунта',
  })
  @IsNotEmpty({ message: 'Необходим ID Аккаунта' })
  @IsPositive({ message: 'ID должен быть положительным числом' })
  @IsNumber({ allowNaN: false }, { message: 'ID должен быть числом' })
  account_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID Места',
  })
  @IsNotEmpty({ message: 'Необходим ID Места' })
  @IsPositive({ message: 'ID должен быть положительным числом' })
  @IsNumber({ allowNaN: false }, { message: 'ID должен быть числом' })
  place_id: number;
}
