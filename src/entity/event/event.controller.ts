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
import { createEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';

@Controller('entity/event')
@UseGuards(RolesGuard)
@Roles('ADMIN')
@ApiTags('Мероприятия')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр места по ID' })
  @ApiResponse({ status: 200, type: Event })
  getByID(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.eventService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Просмотр всех мест' })
  @ApiResponse({ status: 200, type: [Event] })
  getAll() {
    return this.eventService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового места' })
  @ApiResponse({ status: 200 })
  create(@Body() accountDto: createEventDto) {
    return this.eventService.create(accountDto);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Изменение места' })
  @ApiResponse({ status: 204 })
  update(@Param() params: queryIdDto, @Body() dto: createEventDto) {
    const id: number = +params.id;
    return this.eventService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление места' })
  @ApiResponse({ status: 204 })
  delete(@Param() params: queryIdDto) {
    const id: number = +params.id;
    return this.eventService.delete(id);
  }
}
