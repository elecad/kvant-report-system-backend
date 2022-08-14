import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileTableService } from './file-table.service';
import { CreateFileTableDto } from './dto/create-file-table.dto';
import { UpdateFileTableDto } from './dto/update-file-table.dto';

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
  findOne(@Param('id') id: string) {
    return this.fileTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileTableDto: UpdateFileTableDto) {
    return this.fileTableService.update(+id, updateFileTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileTableService.remove(+id);
  }
}
