import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DependencyTypeTableService } from './dependency-type-table.service';
import { CreateDependencyTypeTableDto } from './dto/create-dependency-type-table.dto';
import { UpdateDependencyTypeTableDto } from './dto/update-dependency-type-table.dto';

@Controller('dependency-type-table')
export class DependencyTypeTableController {
  constructor(private readonly dependencyTypeTableService: DependencyTypeTableService) {}

  @Post()
  create(@Body() createDependencyTypeTableDto: CreateDependencyTypeTableDto) {
    return this.dependencyTypeTableService.create(createDependencyTypeTableDto);
  }

  @Get()
  findAll() {
    return this.dependencyTypeTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dependencyTypeTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDependencyTypeTableDto: UpdateDependencyTypeTableDto) {
    return this.dependencyTypeTableService.update(+id, updateDependencyTypeTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dependencyTypeTableService.remove(+id);
  }
}
