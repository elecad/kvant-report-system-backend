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
import { AboutDependencyService } from './about_dependency.service';
import { CreateAboutDependencyDto } from './dto/create-about_dependency.dto';
import { UpdateAboutDependencyDto } from './dto/update-about_dependency.dto';

@Controller('about-dependency')
export class AboutDependencyController {
  constructor(
    private readonly aboutDependencyService: AboutDependencyService,
  ) {}

  @Post()
  create(@Body() createAboutDependencyDto: CreateAboutDependencyDto) {
    return this.aboutDependencyService.create(createAboutDependencyDto);
  }

  @Get()
  findAll() {
    return this.aboutDependencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.aboutDependencyService.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateAboutDependencyDto: UpdateAboutDependencyDto,
  ) {
    return this.aboutDependencyService.update(id, updateAboutDependencyDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.aboutDependencyService.remove(id);
  }
}
