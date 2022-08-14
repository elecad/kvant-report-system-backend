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
import { ProgrammTableService } from './programm-table.service';
import { CreateProgrammTableDto } from './dto/create-programm-table.dto';
import { UpdateProgrammTableDto } from './dto/update-programm-table.dto';
import { FindOptions } from 'sequelize';
import { ProgrammTable } from './entities/programm-table.entity';
import { InjectModel } from '@nestjs/sequelize';
import { DirectionTableService } from '../direction-table/direction-table.service';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { DependencyTableService } from '../dependency-table/dependency-table.service';
import { SchoolTableService } from '../school-table/school-table.service';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';

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
