import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionTableService } from './session-table.service';
import { CreateSessionTableDto } from './dto/create-session-table.dto';
import { UpdateSessionTableDto } from './dto/update-session-table.dto';

@Controller('session-table')
export class SessionTableController {
  constructor(private readonly sessionTableService: SessionTableService) {}

  @Post()
  create(@Body() createSessionTableDto: CreateSessionTableDto) {
    return this.sessionTableService.create(createSessionTableDto);
  }

  @Get()
  findAll() {
    return this.sessionTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionTableDto: UpdateSessionTableDto) {
    return this.sessionTableService.update(+id, updateSessionTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionTableService.remove(+id);
  }
}
