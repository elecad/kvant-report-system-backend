import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirectionTableService } from './direction-table.service';
import { CreateDirectionTableDto } from './dto/create-direction-table.dto';
import { UpdateDirectionTableDto } from './dto/update-direction-table.dto';

@Controller('direction-table')
export class DirectionTableController {
  constructor(private readonly directionTableService: DirectionTableService) {}

  @Post()
  create(@Body() createDirectionTableDto: CreateDirectionTableDto) {
    return this.directionTableService.create(createDirectionTableDto);
  }

  @Get()
  findAll() {
    return this.directionTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directionTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirectionTableDto: UpdateDirectionTableDto) {
    return this.directionTableService.update(+id, updateDirectionTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directionTableService.remove(+id);
  }
}
