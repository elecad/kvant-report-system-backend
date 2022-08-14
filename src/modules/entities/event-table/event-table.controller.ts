import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventTableService } from './event-table.service';
import { CreateEventTableDto } from './dto/create-event-table.dto';
import { UpdateEventTableDto } from './dto/update-event-table.dto';

@Controller('event-table')
export class EventTableController {
  constructor(private readonly eventTableService: EventTableService) {}

  @Post()
  create(@Body() createEventTableDto: CreateEventTableDto) {
    return this.eventTableService.create(createEventTableDto);
  }

  @Get()
  findAll() {
    return this.eventTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventTableDto: UpdateEventTableDto) {
    return this.eventTableService.update(+id, updateEventTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventTableService.remove(+id);
  }
}
