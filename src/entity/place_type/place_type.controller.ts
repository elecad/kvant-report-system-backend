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
import { createPlaceTypeDto } from './dto/create-place_type.dto';
import { PlaceType } from './place_type.model';
import { PlaceTypeService } from './place_type.service';

@Controller('place-type')
export class PlaceTypeController {
  constructor(private placeTypeService: PlaceTypeService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр места по ID' })
  @ApiResponse({ status: 200, type: PlaceType })
  getByID(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.placeTypeService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Просмотр всех мест' })
  @ApiResponse({ status: 200, type: [PlaceType] })
  getAll() {
    return this.placeTypeService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового места' })
  @ApiResponse({ status: 200 })
  create(@Body() dto: createPlaceTypeDto) {
    return this.placeTypeService.create(dto);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Изменение места' })
  @ApiResponse({ status: 204 })
  update(@Param() params: queryIdDto, @Body() dto: createPlaceTypeDto) {
    const id: number = +params.id;
    return this.placeTypeService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление места' })
  @ApiResponse({ status: 204 })
  delete(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.placeTypeService.delete(id);
  }
}
