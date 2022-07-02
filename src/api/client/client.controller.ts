import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Auth } from 'src/decorators/account-auth.decorator';
import { AuthDto } from 'src/dto/auth.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ClientService } from './client.service';
import { addAnswerDto } from './dto/add-answer.dto';
import { getPlaceAnswerDto } from './dto/get-place_answer.dto';
@Controller('')
@UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private clientService: ClientService) {}
  @Get('tasks')
  task(@Auth() user: AuthDto) {
    return this.clientService.getTasks(user);
  }

  @Get('task/:task_id')
  getPlaceTask(@Param() params: getPlaceAnswerDto, @Auth() user: AuthDto) {
    const id: number = +params.task_id;
    return this.clientService.getPlaceTask(id, user);
  }

  @Post('answer')
  addAnswer(@Body() dto: addAnswerDto, @Auth() user: AuthDto) {
    return this.clientService.addAnswer(dto, user);
  }

  @Post('task/:task_id')
  getStatistic(@Param() params: getPlaceAnswerDto, @Auth() user: AuthDto) {
    const id: number = +params.task_id;
    return this.clientService.getStatistic(id, user);
  }
}
