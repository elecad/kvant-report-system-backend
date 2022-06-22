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
import { queryIdDto } from 'src/dto/query-id.dto';
import { createProgrammDataDto } from './dto/create-programm_data.dto';
import { ProgrammDataService } from './programm_data.service';

@Controller('programm-data')
export class ProgrammDataController {
  constructor(private programmDataService: ProgrammDataService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр места по ID' })
  @ApiResponse({ status: 200, type: Event })
  getByID(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.programmDataService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Просмотр всех мест' })
  @ApiResponse({ status: 200, type: [Event] })
  getAll() {
    return this.programmDataService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового места' })
  @ApiResponse({ status: 200 })
  create(@Body() accountDto: createProgrammDataDto) {
    return this.programmDataService.create(accountDto);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Изменение места' })
  @ApiResponse({ status: 204 })
  update(@Param() params: queryIdDto, @Body() dto: createProgrammDataDto) {
    const id: number = +params.id;
    return this.programmDataService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление места' })
  @ApiResponse({ status: 204 })
  delete(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.programmDataService.delete(id);
  }
}
