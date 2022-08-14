import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';
import { CreateProgrammTableDto } from './dto/create-programm-table.dto';
import { UpdateProgrammTableDto } from './dto/update-programm-table.dto';
import { ProgrammTableService } from './programm-table.service';

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
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.programmTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateProgrammTableDto: UpdateProgrammTableDto,
  ) {
    return this.programmTableService.update(id, updateProgrammTableDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.programmTableService.remove(id);
  }
}
