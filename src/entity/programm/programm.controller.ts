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
import { createProgrammDto } from './dto/create-programm.dto';
import { Programm } from './programm.model';
import { ProgrammService } from './programm.service';

@Controller('programm')
export class ProgrammController {
  constructor(private programmService: ProgrammService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр Программы по ID' })
  @ApiResponse({ status: 200, type: Programm })
  getByID(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.programmService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Просмотр всех Программ' })
  @ApiResponse({ status: 200, type: [Programm] })
  getAll() {
    return this.programmService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание новой Программы' })
  @ApiResponse({ status: 200 })
  create(@Body() accountDto: createProgrammDto) {
    return this.programmService.create(accountDto);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Изменение Программы' })
  @ApiResponse({ status: 204 })
  update(@Param() params: queryIdDto, @Body() dto: createProgrammDto) {
    const id: number = +params.id;
    return this.programmService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление Программы' })
  @ApiResponse({ status: 204 })
  delete(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.programmService.delete(id);
  }
}
