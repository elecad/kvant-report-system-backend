import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchoolTableService } from './school-table.service';
import { CreateSchoolTableDto } from './dto/create-school-table.dto';
import { UpdateSchoolTableDto } from './dto/update-school-table.dto';

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
  findOne(@Param('id') id: string) {
    return this.schoolTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolTableDto: UpdateSchoolTableDto) {
    return this.schoolTableService.update(+id, updateSchoolTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolTableService.remove(+id);
  }
}
