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
import { SchoolTableService } from './school-table.service';
import { CreateSchoolTableDto } from './dto/create-school-table.dto';
import { UpdateSchoolTableDto } from './dto/update-school-table.dto';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';

@Controller('school-table')
export class SchoolTableController {
  constructor(private readonly schoolTableService: SchoolTableService) {}

  @Post()
  create(@Body() createSchoolTableDto: CreateSchoolTableDto) {
    return this.schoolTableService.create(createSchoolTableDto);
  }

  @Get()
  findAll() {
    return this.schoolTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.schoolTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateSchoolTableDto: UpdateSchoolTableDto,
  ) {
    return this.schoolTableService.update(id, updateSchoolTableDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.schoolTableService.remove(id);
  }
}
