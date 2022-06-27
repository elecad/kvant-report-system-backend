import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Auth } from 'src/decorators/account-auth.decorator';
import { AuthDto } from 'src/dto/auth.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ClientService } from './client.service';
import { getPlaceAnswerDto } from './dto/get-place_answer.dto';
@Controller('')
@UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private clientService: ClientService) {}
  @Get('task')
  task(@Auth() user: AuthDto) {
    return this.clientService.getTasks(user);
  }

  @Get('task/:task_id')
  getPlaceTask(@Param() params: getPlaceAnswerDto, @Auth() user: AuthDto) {
    const id: number = +params.task_id;
    return this.clientService.getPlaceTask(id, user);
  }
}
