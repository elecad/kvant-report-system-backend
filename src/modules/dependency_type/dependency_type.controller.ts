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
import { DependencyTypeService } from './dependency_type.service';
import { CreateDependencyTypeDto } from './dto/create-dependency_type.dto';
import { UpdateDependencyTypeDto } from './dto/update-dependency_type.dto';

@Controller('dependency-type')
export class DependencyTypeController {
  constructor(private readonly dependencyTypeService: DependencyTypeService) {}

  @Post()
  create(@Body() createDependencyTypeDto: CreateDependencyTypeDto) {
    return this.dependencyTypeService.create(createDependencyTypeDto);
  }

  @Get()
  findAll() {
    return this.dependencyTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    // return this.dependencyTypeService.validateOne({
    //   type: 'existing',
    //   column: 'id',
    //   value: id,
    // });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateDependencyTypeDto: UpdateDependencyTypeDto,
  ) {
    return this.dependencyTypeService.update(id, updateDependencyTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.dependencyTypeService.remove(id);
  }
}
