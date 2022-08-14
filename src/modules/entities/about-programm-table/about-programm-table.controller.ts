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
import { AboutProgrammTableService } from './about-programm-table.service';
import { CreateAboutProgrammTableDto } from './dto/create-about-programm-table.dto';
import { UpdateAboutProgrammTableDto } from './dto/update-about-programm-table.dto';

@Controller('about-programm-table')
export class AboutProgrammTableController {
  constructor(
    private readonly aboutProgrammTableService: AboutProgrammTableService,
  ) {}

  @Post()
  create(@Body() createAboutProgrammTableDto: CreateAboutProgrammTableDto) {
    return this.aboutProgrammTableService.create(createAboutProgrammTableDto);
  }

  @Get()
  findAll() {
    return this.aboutProgrammTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.aboutProgrammTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateAboutProgrammTableDto: UpdateAboutProgrammTableDto,
  ) {
    return this.aboutProgrammTableService.update(
      id,
      updateAboutProgrammTableDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.aboutProgrammTableService.remove(id);
  }
}
