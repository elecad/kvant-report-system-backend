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
import { SchoolTypeService } from './school_type.service';
import { CreateSchoolTypeDto } from './dto/create-school_type.dto';
import { UpdateSchoolTypeDto } from './dto/update-school_type.dto';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';

@Controller('school-type')
export class SchoolTypeController {
  constructor(private readonly schoolTypeService: SchoolTypeService) {}

  @Post()
  create(@Body() createSchoolTypeDto: CreateSchoolTypeDto) {
    return this.schoolTypeService.create(createSchoolTypeDto);
  }

  @Get()
  findAll() {
    return this.schoolTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.schoolTypeService.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateSchoolTypeDto: UpdateSchoolTypeDto,
  ) {
    return this.schoolTypeService.update(id, updateSchoolTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.schoolTypeService.remove(id);
  }
}
