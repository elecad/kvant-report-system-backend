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
import { createSchoolTypeDto } from './dto/create-school_type.dto';
import { SchoolType } from './school_type.model';
import { SchoolTypeService } from './school_type.service';

@Controller('school-type')
@UseGuards(RolesGuard)
@Roles('ADMIN')
@ApiTags('Тип учреждения')
export class SchoolTypeController {
  constructor(private schoolTypeService: SchoolTypeService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр места по ID' })
  @ApiResponse({ status: 200, type: SchoolType })
  getByID(@Param() params: queryIdDto) {
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
  update(@Param() params: queryIdDto, @Body() dto: createSchoolTypeDto) {
    const id: number = +params.id;
    return this.schoolTypeService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление места' })
  @ApiResponse({ status: 204 })
  delete(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.schoolTypeService.delete(id);
  }
}
