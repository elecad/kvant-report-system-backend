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
import { AboutDependencyTableService } from './about-dependency-table.service';
import { CreateAboutDependencyTableDto } from './dto/create-about-dependency-table.dto';
import { UpdateAboutDependencyTableDto } from './dto/update-about-dependency-table.dto';

@Controller('about-dependency-table')
export class AboutDependencyTableController {
  constructor(
    private readonly aboutDependencyTableService: AboutDependencyTableService,
  ) {}

  @Post()
  create(@Body() createAboutDependencyTableDto: CreateAboutDependencyTableDto) {
    return this.aboutDependencyTableService.create(
      createAboutDependencyTableDto,
    );
  }

  @Get()
  findAll() {
    return this.aboutDependencyTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.aboutDependencyTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateAboutDependencyTableDto: UpdateAboutDependencyTableDto,
  ) {
    return this.aboutDependencyTableService.update(
      id,
      updateAboutDependencyTableDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.aboutDependencyTableService.remove(id);
  }
}
