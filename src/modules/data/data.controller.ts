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
import { DataService } from './data.service';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  create(@Body() createDatumDto: CreateDatumDto) {
    return this.dataService.create(createDatumDto);
  }

  @Get()
  findAll() {
    return this.dataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.dataService.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateDatumDto: UpdateDatumDto,
  ) {
    return this.dataService.update(id, updateDatumDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.dataService.remove(id);
  }
}
