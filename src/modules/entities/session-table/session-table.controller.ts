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
import { SessionTableService } from './session-table.service';
import { CreateSessionTableDto } from './dto/create-session-table.dto';
import { UpdateSessionTableDto } from './dto/update-session-table.dto';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';

@Controller('session-table')
export class SessionTableController {
  constructor(private readonly sessionTableService: SessionTableService) {}

  @Post()
  create(@Body() сreateSessionTableDto: CreateSessionTableDto) {
    return this.sessionTableService.create(сreateSessionTableDto);
  }

  @Get()
  findAll() {
    return this.sessionTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.sessionTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateSessionTableDto: UpdateSessionTableDto,
  ) {
    return this.sessionTableService.update(id, updateSessionTableDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.sessionTableService.remove(id);
  }
}
