import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth-guard/auth.guard';
import { User } from 'src/guards/auth-guard/decorators/user.decorator';
import { AuthUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';
import { AccountService } from '../account/account.service';
import { AnswerService } from '../answer/answer.service';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { DependencyService } from '../dependency/dependency.service';
import { TaskService } from '../task/task.service';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly accountService: AccountService,
    private readonly taskService: TaskService,
    private readonly dependencyService: DependencyService,
    private readonly answerService: AnswerService,
  ) {}

  @Get('')
  getProfile(@User() user: AuthUser) {
    return this.accountService.getProfile(user);
  }

  @Get('/tasks')
  getTasks(@User() user: AuthUser) {
    return this.taskService.getTasksByUser(user);
  }

  @Get('/task/:id')
  async getDependencyByTask(
    @Param('id', new ParseIntPipe(parseIntOptions)) task_id: number,
    @User() user: AuthUser,
  ) {
    return this.profileService.getDependencyByTaskID(task_id, user);
  }

  @Post('answer')
  async createAnswer(
    @User() user: AuthUser,
    @Body() createAnswerDto: CreateAnswerDto,
  ) {
    const dependencies = await this.profileService.getDependencyByTaskID(
      createAnswerDto.task_id,
      user,
    );
    return this.answerService.create(createAnswerDto, user, dependencies);
  }

  @Get('answer/:id')
  async getAnswer(
    @User() user: AuthUser,
    @Param('id', new ParseIntPipe(parseIntOptions)) answer_id: number,
  ) {
    return this.answerService.getByIdAndAuthor(answer_id, user);
  }
}
