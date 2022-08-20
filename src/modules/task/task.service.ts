import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { STRINGS } from 'src/res/strings';
import { AccountTable } from '../entities/account-table/entities/account-table.entity';
import { AnswerTable } from '../entities/answer-table/entities/answer-table.entity';
import { TaskTableService } from '../entities/task-table/task-table.service';

@Injectable()
export class TaskService {
  constructor(private readonly taskTableService: TaskTableService) {}

  async getTasksByUser(user: AuthUser) {
    const tasks = await this.taskTableService.findAll({
      include: [
        {
          model: AnswerTable,
          include: [{ model: AccountTable, where: { id: user.id } }],
        },
        { model: AccountTable, attributes: ['surname', 'name', 'middlename'] },
      ],
    });
    return tasks.map((task) => {
      const { answers, author_id, ...jsonTask } = task.toJSON();
      return {
        ...jsonTask,
        completed: answers.length !== 0,
        answer_id: answers && answers[0] ? answers[0].id : null,
      };
    });
  }

  async getTaskByIdAndUser(task_id: number, user: AuthUser) {
    const tasks = await this.getTasksByUser(user);

    const currentTask = tasks.find(
      (t) => t.id === task_id && t.completed === false,
    );

    if (!currentTask) throw new BadRequestException(STRINGS.IsBadTaskRequest);

    return currentTask;
  }
}
