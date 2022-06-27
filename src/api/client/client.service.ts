import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { Account } from 'src/entity/account/account.model';
import { AnswerService } from 'src/entity/answer/answer.service';
import { Task } from 'src/entity/task/task.model';
import { TaskService } from 'src/entity/task/task.service';

@Injectable()
export class ClientService {
  constructor(
    private taskService: TaskService,
    private answerService: AnswerService,
  ) {}

  async getTasks(user: AuthDto) {
    const tasks = await this.taskService.getAll({
      attributes: ['id', 'half_year', 'year', 'createdAt'],
      include: { model: Account, attributes: ['FIO'] },
    });

    return Promise.all(
      tasks.map(async (task) => {
        const answer = await this.answerService.getOne({
          where: { account_id: user.id, task_id: task.id },
        });

        return { ...task.toJSON(), done: !!answer };
      }),
    );
  }
}
