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
import { DirectionService } from './direction.service';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';

@Controller('direction')
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Post()
  create(@Body() createDirectionDto: CreateDirectionDto) {
    return this.directionService.create(createDirectionDto);
  }

  @Get()
  findAll() {
    return this.directionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.directionService.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateDirectionDto: UpdateDirectionDto,
  ) {
    return this.directionService.update(id, updateDirectionDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.directionService.remove(id);
  }
}
