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
import { Direction } from './direction.model';
import { DirectionService } from './direction.service';
import { createDirectionDto } from './dto/create-direction.dto';

@Controller('direction')
export class DirectionController {
  constructor(private directionService: DirectionService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр направления по ID' })
  @ApiResponse({ status: 200, type: Direction })
  getByID(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.directionService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Просмотр всех мест' })
  @ApiResponse({ status: 200, type: [Direction] })
  getAll() {
    return this.directionService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового места' })
  @ApiResponse({ status: 200 })
  create(@Body() dto: createDirectionDto) {
    return this.directionService.create(dto);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Изменение места' })
  @ApiResponse({ status: 204 })
  update(@Param() params: queryIdDto, @Body() dto: createDirectionDto) {
    const id: number = +params.id;
    return this.directionService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление места' })
  @ApiResponse({ status: 204 })
  delete(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.directionService.delete(id);
  }
}
