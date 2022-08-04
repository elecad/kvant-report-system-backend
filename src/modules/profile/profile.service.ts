import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AuthDependency,
  AuthUser,
} from 'src/guards/auth-guard/interfaces/auth.interface';
import { STRINGS } from 'src/res/strings';
import { validationArray } from 'src/utils/validation-array.util';
import { AboutDependencyService } from '../about_dependency/about_dependency.service';
import { AccountService } from '../account/account.service';
import { AnswerService } from '../answer/answer.service';
import { DataOfType } from '../data_of_type/entities/data_of_type.entity';
import { DependencyService } from '../dependency/dependency.service';
import { ProgrammService } from '../programm/programm.service';
import { ReportService } from '../report/report.service';
import { TaskService } from '../task/task.service';
import {
  AddAnswerAbout,
  AddAnswerDependency,
  AddAnswerDto,
} from './dto/add-answer.dto';

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

    return usersDependencies;
  }
}
