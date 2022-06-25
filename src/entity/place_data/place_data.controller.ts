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
import { createPlaceDataDto } from './dto/create-place_data';
import { PlaceDataService } from './place_data.service';

@Controller('place-data')
@UseGuards(RolesGuard)
@Roles('ADMIN')
@ApiTags('Данные о местах')
export class PlaceDataController {
  constructor(private placeService: PlaceDataService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр места по ID' })
  @ApiResponse({ status: 200, type: Event })
  getByID(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.placeService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Просмотр всех мест' })
  @ApiResponse({ status: 200, type: [Event] })
  getAll() {
    return this.placeService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового места' })
  @ApiResponse({ status: 200 })
  create(@Body() accountDto: createPlaceDataDto) {
    return this.placeService.create(accountDto);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Изменение места' })
  @ApiResponse({ status: 204 })
  update(@Param() params: queryIdDto, @Body() dto: createPlaceDataDto) {
    const id: number = +params.id;
    return this.placeService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление места' })
  @ApiResponse({ status: 204 })
  delete(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.placeService.delete(id);
  }
}
