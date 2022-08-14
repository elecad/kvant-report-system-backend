import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DependencyTableService } from './dependency-table.service';
import { CreateDependencyTableDto } from './dto/create-dependency-table.dto';
import { UpdateDependencyTableDto } from './dto/update-dependency-table.dto';

@Controller('dependency-table')
export class DependencyTableController {
  constructor(private readonly dependencyTableService: DependencyTableService) {}

  @Post()
  create(@Body() createDependencyTableDto: CreateDependencyTableDto) {
    return this.dependencyTableService.create(createDependencyTableDto);
  }

  @Get()
  findAll() {
    return this.dependencyTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dependencyTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDependencyTableDto: UpdateDependencyTableDto) {
    return this.dependencyTableService.update(+id, updateDependencyTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dependencyTableService.remove(+id);
  }
}
