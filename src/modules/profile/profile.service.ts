import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { STRINGS } from 'src/res/strings';
import { AboutDependencyService } from '../about_dependency/about_dependency.service';
import { Account } from '../account/entities/account.entity';
import { Answer } from '../answer/entities/answer.entity';
import { TaskService } from '../task/task.service';

@Injectable()
export class ProfileService {
  constructor(
    private taskService: TaskService,
    private aboutDependencyService: AboutDependencyService,
  ) {}

  async getProfileInfo(user: IUser) {
    return user;
  }

  async getTasksByUser(user: IUser) {
    const tasks = await this.taskService.findAll({
      attributes: ['id', 'year', 'half_year'],
      include: [
        {
          model: Answer,
          include: [{ model: Account, where: { id: user.id } }],
        },
        { model: Account, attributes: ['surname', 'name', 'middlename'] },
      ],
    });
    return tasks.map(({ id, year, half_year, author, answers }) => ({
      id,
      year,
      half_year,
      author,
      completed: answers.length !== 0,
    }));
  }

  async getDependencyByTaskId(task_id: number, user: IUser) {
    await this.taskService.validateOne({
      column: 'id',
      type: 'existing',
      value: task_id,
    });

    const tasks = await this.getTasksByUser(user);

    const currentTask = tasks.find(
      (t) => t.id === task_id && t.completed === false,
    );

    if (!currentTask) this.throwBadRequestException(STRINGS.IsBadTaskRequest);

    const aboutDependecies = await Promise.all(
      user.dependencies.map((d) =>
        this.aboutDependencyService.findOne({
          where: { dependency_id: d.id },
          include: { model: Answer, where: { task_id } },
        }),
      ),
    );

    return user.dependencies.filter((_, index) => !aboutDependecies[index]);
  }

  async addAnswer() {}

  private throwBadRequestException(message: string) {
    throw new HttpException(
      {
        statusCode: 400,
        message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
