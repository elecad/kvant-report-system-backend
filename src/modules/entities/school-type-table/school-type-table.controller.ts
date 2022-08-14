import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchoolTypeTableService } from './school-type-table.service';
import { CreateSchoolTypeTableDto } from './dto/create-school-type-table.dto';
import { UpdateSchoolTypeTableDto } from './dto/update-school-type-table.dto';

@Controller('school-type-table')
export class SchoolTypeTableController {
  constructor(private readonly schoolTypeTableService: SchoolTypeTableService) {}

  @Post()
  create(@Body() createSchoolTypeTableDto: CreateSchoolTypeTableDto) {
    return this.schoolTypeTableService.create(createSchoolTypeTableDto);
  }

  @Get()
  findAll() {
    return this.schoolTypeTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolTypeTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolTypeTableDto: UpdateSchoolTypeTableDto) {
    return this.schoolTypeTableService.update(+id, updateSchoolTypeTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolTypeTableService.remove(+id);
  }
}
