import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgrammTableService } from './programm-table.service';
import { CreateProgrammTableDto } from './dto/create-programm-table.dto';
import { UpdateProgrammTableDto } from './dto/update-programm-table.dto';

@Controller('programm-table')
export class ProgrammTableController {
  constructor(private readonly programmTableService: ProgrammTableService) {}

  @Post()
  create(@Body() createProgrammTableDto: CreateProgrammTableDto) {
    return this.programmTableService.create(createProgrammTableDto);
  }

  @Get()
  findAll() {
    return this.programmTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programmTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgrammTableDto: UpdateProgrammTableDto) {
    return this.programmTableService.update(+id, updateProgrammTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programmTableService.remove(+id);
  }
}
