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
import { DependencyTableService } from './dependency-table.service';
import { CreateDependencyTableDto } from './dto/create-dependency-table.dto';
import { UpdateDependencyTableDto } from './dto/update-dependency-table.dto';

@Controller('dependency-table')
export class DependencyTableController {
  constructor(
    private readonly dependencyTableService: DependencyTableService,
  ) {}

  @Post()
  create(@Body() createDependencyTableDto: CreateDependencyTableDto) {
    return this.dependencyTableService.create(createDependencyTableDto);
  }

  @Get()
  findAll() {
    return this.dependencyTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.dependencyTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateDependencyTableDto: UpdateDependencyTableDto,
  ) {
    return this.dependencyTableService.update(id, updateDependencyTableDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.dependencyTableService.remove(id);
  }
}
