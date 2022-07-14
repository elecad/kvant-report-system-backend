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
import { DependencyType } from '../dependency_type/entities/dependency_type.entity';
import { DependencyService } from './dependency.service';
import { CreateDependencyDto } from './dto/create-dependency.dto';
import { UpdateDependencyDto } from './dto/update-dependency.dto';

@Controller('dependency')
export class DependencyController {
  constructor(private readonly dependencyService: DependencyService) {}

  @Post()
  create(@Body() createDependencyDto: CreateDependencyDto) {
    return this.dependencyService.create(createDependencyDto);
  }

  @Get()
  findAll() {
    return this.dependencyService.findAll({
      include: [{ model: DependencyType }],
    });
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.dependencyService.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateDependencyDto: UpdateDependencyDto,
  ) {
    return this.dependencyService.update(id, updateDependencyDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.dependencyService.remove(id);
  }
}
