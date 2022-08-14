import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AboutProgrammTableService } from './about-programm-table.service';
import { CreateAboutProgrammTableDto } from './dto/create-about-programm-table.dto';
import { UpdateAboutProgrammTableDto } from './dto/update-about-programm-table.dto';

@Controller('about-programm-table')
export class AboutProgrammTableController {
  constructor(private readonly aboutProgrammTableService: AboutProgrammTableService) {}

  @Post()
  create(@Body() createAboutProgrammTableDto: CreateAboutProgrammTableDto) {
    return this.aboutProgrammTableService.create(createAboutProgrammTableDto);
  }

  @Get()
  findAll() {
    return this.aboutProgrammTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutProgrammTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutProgrammTableDto: UpdateAboutProgrammTableDto) {
    return this.aboutProgrammTableService.update(+id, updateAboutProgrammTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutProgrammTableService.remove(+id);
  }
}
