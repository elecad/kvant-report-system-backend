import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { createSchoolTypeDto } from './dto/create-school_type.dto';
import { SchoolType } from './school_type.model';
import { SchoolTypeService } from './school_type.service';

@Controller('school-type')
export class SchoolTypeController {
  constructor(private schoolTypeService: SchoolTypeService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр места по ID' })
  @ApiResponse({ status: 200, type: SchoolType })
  getByID(@Param() params) {
    const id: number = +params.id;
    return this.schoolTypeService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Просмотр всех мест' })
  @ApiResponse({ status: 200, type: [SchoolType] })
  getAll() {
    return this.schoolTypeService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового места' })
  @ApiResponse({ status: 200 })
  create(@Body() dto: createSchoolTypeDto) {
    return this.schoolTypeService.create(dto);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Изменение места' })
  @ApiResponse({ status: 204 })
  update(@Param() params, @Body() dto: createSchoolTypeDto) {
    const id: number = +params.id;
    return this.schoolTypeService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление места' })
  @ApiResponse({ status: 204 })
  delete(@Param() params) {
    const id: number = +params.id;
    return this.schoolTypeService.delete(id);
  }
}
