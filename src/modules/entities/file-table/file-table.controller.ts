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
import { FileTableService } from './file-table.service';
import { CreateFileTableDto } from './dto/create-file-table.dto';
import { UpdateFileTableDto } from './dto/update-file-table.dto';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';

@Controller('file-table')
export class FileTableController {
  constructor(private readonly fileTableService: FileTableService) {}

  @Post()
  create(@Body() createFileTableDto: CreateFileTableDto) {
    return this.fileTableService.create(createFileTableDto);
  }

  @Get()
  findAll() {
    return this.fileTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.fileTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateFileTableDto: UpdateFileTableDto,
  ) {
    return this.fileTableService.update(id, updateFileTableDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.fileTableService.remove(id);
  }
}
