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
import { ProgrammService } from './programm.service';
import { CreateProgrammDto } from './dto/create-programm.dto';
import { UpdateProgrammDto } from './dto/update-programm.dto';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';

@Controller('programm')
export class ProgrammController {
  constructor(private readonly programmService: ProgrammService) {}

  @Post()
  create(@Body() createProgrammDto: CreateProgrammDto) {
    return this.programmService.create(createProgrammDto);
  }

  @Get()
  findAll() {
    return this.programmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.programmService.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateProgrammDto: UpdateProgrammDto,
  ) {
    return this.programmService.update(id, updateProgrammDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.programmService.remove(id);
  }
}
