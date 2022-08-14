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
import { AnswerTableService } from './answer-table.service';
import { CreateAnswerTableDto } from './dto/create-answer-table.dto';
import { UpdateAnswerTableDto } from './dto/update-answer-table.dto';

@Controller('answer-table')
export class AnswerTableController {
  constructor(private readonly answerTableService: AnswerTableService) {}

  @Post()
  create(@Body() createAnswerTableDto: CreateAnswerTableDto) {
    return this.answerTableService.create(createAnswerTableDto);
  }

  @Get()
  findAll() {
    return this.answerTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.answerTableService.validateOne({
      column: 'id',
      type: 'existing',
      value: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
    @Body() updateAnswerTableDto: UpdateAnswerTableDto,
  ) {
    return this.answerTableService.update(id, updateAnswerTableDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe(parseIntOptions)) id: number) {
    return this.answerTableService.remove(id);
  }
}
