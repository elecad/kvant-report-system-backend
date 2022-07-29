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
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';
import { AboutProgrammService } from './about_programm.service';
import { CreateAboutProgrammDto } from './dto/create-about_programm.dto';
import { UpdateAboutProgrammDto } from './dto/update-about_programm.dto';

@Controller('about-programm')
export class AboutProgrammController {
  constructor(private readonly aboutProgrammService: AboutProgrammService) {}

  @Post()
  create(@Body() createAboutProgrammDto: CreateAboutProgrammDto) {
    return this.aboutProgrammService.create(createAboutProgrammDto);
  }

  @Get()
  findAll() {
    return this.aboutProgrammService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.aboutProgrammService.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateAboutProgrammDto: UpdateAboutProgrammDto,
  ) {
    return this.aboutProgrammService.update(id, updateAboutProgrammDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.aboutProgrammService.remove(id);
  }
}
