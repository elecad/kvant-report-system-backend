import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { createDateTypesDto } from './dto/create-data_types.dto';

@Controller('data-type')
export class DataTypesController {
  // constructor(private dataTypesService: DataTypes) {}

  @Post()
  @ApiOperation({ summary: 'Создание нового типа данных' })
  @ApiResponse({ status: 200 })
  create(@Body() dto: createDateTypesDto) {
    // return this.dataTypesService.create(dto);
    return 1;
  }
}
