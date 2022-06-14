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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createPlaceDto } from './dto/create-place.dto';
import { Place } from './place.model';
import { PlaceService } from './place.service';

@ApiTags('Место')
@Controller('place')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр места по ID' })
  @ApiResponse({ status: 200, type: Place })
  getByID(@Param() params) {
    const id: number = +params.id;
    return this.placeService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Просмотр всех мест' })
  @ApiResponse({ status: 200, type: [Place] })
  getAll() {
    return this.placeService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового места' })
  @ApiResponse({ status: 200 })
  create(@Body() accountDto: createPlaceDto) {
    return this.placeService.create(accountDto);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Изменение места' })
  @ApiResponse({ status: 204 })
  update(@Param() params, @Body() dto: createPlaceDto) {
    const id: number = +params.id;
    return this.placeService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление места' })
  @ApiResponse({ status: 204 })
  delete(@Param() params) {
    const id: number = +params.id;
    return this.placeService.delete(id);
  }
}
