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
import { SchoolTypeTableService } from './school-type-table.service';
import { CreateSchoolTypeTableDto } from './dto/create-school-type-table.dto';
import { UpdateSchoolTypeTableDto } from './dto/update-school-type-table.dto';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';

@Controller('school-type-table')
export class SchoolTypeTableController {
  constructor(
    private readonly schoolTypeTableService: SchoolTypeTableService,
  ) {}

  @Post()
  create(@Body() createSchoolTypeTableDto: CreateSchoolTypeTableDto) {
    return this.schoolTypeTableService.create(createSchoolTypeTableDto);
  }

  @Get()
  findAll() {
    return this.schoolTypeTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.schoolTypeTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateSchoolTypeTableDto: UpdateSchoolTypeTableDto,
  ) {
    return this.schoolTypeTableService.update(id, updateSchoolTypeTableDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.schoolTypeTableService.remove(id);
  }
}
