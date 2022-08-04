import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { AccountService } from '../account/account.service';
import { AnswerService } from '../answer/answer.service';
import { DependencyService } from '../dependency/dependency.service';
import { TaskService } from '../task/task.service';
import { AddAnswerDto } from './dto/add-answer.dto';

@Injectable()
export class ProfileService {
  constructor(
    private taskService: TaskService,
    // private aboutDependencyService: AboutDependencyService,
    // private reportService: ReportService,
    // private programmService: ProgrammService,
    private accountService: AccountService,
    private dependencyService: DependencyService,
    private answerService: AnswerService,
  ) {}

  async getProfileInfo(user: AuthUser) {
    return this.accountService.getProfile(user);
  }

  async getTasksByUser({ id }: AuthUser) {
    return this.taskService.getByUserID(id);
  }

  async getDependencyByTaskId(task_id: number, user: AuthUser) {
    return this.dependencyService.getByTaskId(task_id, user);
  }

  async addAnswer(user: AuthUser, addAnswerDto: AddAnswerDto) {
    const usersDependencies = await this.getDependencyByTaskId(
      addAnswerDto.task_id,
      user,
    );

    await this.answerService.validationCreateAnswerDto(
      addAnswerDto,
      usersDependencies,
    );

    await this.answerService.add(user, addAnswerDto);
  }

  async getAnswerByID(id: number, user: AuthUser) {
    return this.answerService.getByID(id, user);
  }
}
