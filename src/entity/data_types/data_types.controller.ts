import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { queryIdDto } from 'src/dto/query-id.dto';
import { RolesGuard } from 'src/guards/roles-auth.guard';
import { DataTypes } from './data_types.model';
import { DataTypesService } from './data_types.service';

import { createDataTypesDto } from './dto/create-data_types.dto';

@Controller('entity/data-type')
@UseGuards(RolesGuard)
@Roles('ADMIN')
@ApiTags('Типы данных')
export class DataTypesController {
  constructor(private dataTypesService: DataTypesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр направления по ID' })
  @ApiResponse({ status: 200, type: DataTypes })
  getByID(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.dataTypesService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Просмотр всех мест' })
  @ApiResponse({ status: 200, type: [DataTypes] })
  getAll() {
    return this.dataTypesService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового места' })
  @ApiResponse({ status: 200 })
  create(@Body() dto: createDataTypesDto) {
    return this.dataTypesService.create(dto);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Изменение места' })
  @ApiResponse({ status: 204 })
  update(@Param() params: queryIdDto, @Body() dto: createDataTypesDto) {
    const id: number = +params.id;
    return this.dataTypesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление места' })
  @ApiResponse({ status: 204 })
  delete(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.dataTypesService.delete(id);
  }
}
