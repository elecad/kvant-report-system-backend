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
import { DependencyTypeTableService } from './dependency-type-table.service';
import { CreateDependencyTypeTableDto } from './dto/create-dependency-type-table.dto';
import { UpdateDependencyTypeTableDto } from './dto/update-dependency-type-table.dto';

@Controller('dependency-type-table')
export class DependencyTypeTableController {
  constructor(
    private readonly dependencyTypeTableService: DependencyTypeTableService,
  ) {}

  @Post()
  create(@Body() CreateDependencyTypeTableDto: CreateDependencyTypeTableDto) {
    return this.dependencyTypeTableService.create(CreateDependencyTypeTableDto);
  }

  @Get()
  findAll() {
    return this.dependencyTypeTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.dependencyTypeTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateDependencyTypeTableDto: UpdateDependencyTypeTableDto,
  ) {
    return this.dependencyTypeTableService.update(
      id,
      updateDependencyTypeTableDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.dependencyTypeTableService.remove(id);
  }
}
