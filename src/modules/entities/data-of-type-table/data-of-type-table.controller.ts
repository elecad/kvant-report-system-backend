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
import { DataOfTypeTableService } from './data-of-type-table.service';
import { CreateDataOfTypeTableDto } from './dto/create-data-of-type-table.dto';
import { UpdateDataOfTypeTableDto } from './dto/update-data-of-type-table.dto';

@Controller('data-of-type-table')
export class DataOfTypeTableController {
  constructor(
    private readonly dataOfTypeTableService: DataOfTypeTableService,
  ) {}

  @Post()
  create(@Body() createDataOfTypeTableDto: CreateDataOfTypeTableDto) {
    return this.dataOfTypeTableService.create(createDataOfTypeTableDto);
  }

  @Get()
  findAll() {
    return this.dataOfTypeTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.dataOfTypeTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateDataOfTypeTableDto: UpdateDataOfTypeTableDto,
  ) {
    return this.dataOfTypeTableService.update(id, updateDataOfTypeTableDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.dataOfTypeTableService.remove(id);
  }
}
