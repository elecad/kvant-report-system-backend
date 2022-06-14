import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class addPermissionDto {
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
    description: 'ID Роли',
  })
  @IsNotEmpty({ message: 'Необходим ID Роли' })
  @IsPositive({ message: 'ID должен быть положительным числом' })
  @IsNumber({ allowNaN: false }, { message: 'ID должен быть числом' })
  role_id: number;
}
