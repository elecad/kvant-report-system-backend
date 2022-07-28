import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgrammService } from './programm.service';
import { CreateProgrammDto } from './dto/create-programm.dto';
import { UpdateProgrammDto } from './dto/update-programm.dto';

@Controller('programm')
export class ProgrammController {
  constructor(private readonly programmService: ProgrammService) {}

  @Post()
  create(@Body() createProgrammDto: CreateProgrammDto) {
    return this.programmService.create(createProgrammDto);
  }

  @Get()
  findAll() {
    return this.programmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgrammDto: UpdateProgrammDto) {
    return this.programmService.update(+id, updateProgrammDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programmService.remove(+id);
  }
}
