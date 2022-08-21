import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnswerTableService } from '../entities/answer-table/answer-table.service';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answer')
export class AnswerController {
  constructor(
    private readonly answerService: AnswerService,
    private readonly answerTableService: AnswerTableService,
  ) {}

  // @Post()
  // create(@Body() createAnswerDto: CreateAnswerDto) {
  //   return this.answerTableService.create(createAnswerDto);
  // }

  // @Get()
  // findAll() {
  //   // return this.answerService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   // return this.answerService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
  //   return this.answerService.update(+id, updateAnswerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return this.answerService.remove(+id);
  // }
}
