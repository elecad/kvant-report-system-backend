import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EventTableService } from './event-table.service';
import { CreateEventTableDto } from './dto/create-event-table.dto';
import { UpdateEventTableDto } from './dto/update-event-table.dto';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';

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
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.eventTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateEventTableDto: UpdateEventTableDto,
  ) {
    return this.eventTableService.update(id, updateEventTableDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.eventTableService.remove(id);
  }
}
