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
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.directionTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateDirectionTableDto: UpdateDirectionTableDto,
  ) {
    return this.directionTableService.update(id, updateDirectionTableDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.directionTableService.remove(id);
  }
}
