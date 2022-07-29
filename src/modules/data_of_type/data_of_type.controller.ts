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
import { DataOfTypeService } from './data_of_type.service';
import { CreateDataOfTypeDto } from './dto/create-data_of_type.dto';
import { UpdateDataOfTypeDto } from './dto/update-data_of_type.dto';

@Controller('data-of-type')
export class DataOfTypeController {
  constructor(private readonly dataOfTypeService: DataOfTypeService) {}

  @Post()
  create(@Body() createDataOfTypeDto: CreateDataOfTypeDto) {
    return this.dataOfTypeService.create(createDataOfTypeDto);
  }

  @Get()
  findAll() {
    return this.dataOfTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.dataOfTypeService.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateDataOfTypeDto: UpdateDataOfTypeDto,
  ) {
    return this.dataOfTypeService.update(+id, updateDataOfTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.dataOfTypeService.remove(+id);
  }
}
