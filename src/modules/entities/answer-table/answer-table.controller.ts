import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.answerTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerTableDto: UpdateAnswerTableDto) {
    return this.answerTableService.update(+id, updateAnswerTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerTableService.remove(+id);
  }
}
