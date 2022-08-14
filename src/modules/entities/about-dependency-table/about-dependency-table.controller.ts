import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AboutDependencyTableService } from './about-dependency-table.service';
import { CreateAboutDependencyTableDto } from './dto/create-about-dependency-table.dto';
import { UpdateAboutDependencyTableDto } from './dto/update-about-dependency-table.dto';

@Controller('about-dependency-table')
export class AboutDependencyTableController {
  constructor(private readonly aboutDependencyTableService: AboutDependencyTableService) {}

  @Post()
  create(@Body() createAboutDependencyTableDto: CreateAboutDependencyTableDto) {
    return this.aboutDependencyTableService.create(createAboutDependencyTableDto);
  }

  @Get()
  findAll() {
    return this.aboutDependencyTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutDependencyTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutDependencyTableDto: UpdateAboutDependencyTableDto) {
    return this.aboutDependencyTableService.update(+id, updateAboutDependencyTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutDependencyTableService.remove(+id);
  }
}
