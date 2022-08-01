import { Injectable } from '@nestjs/common';
import { IUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { Account } from '../account/entities/account.entity';
import { Answer } from '../answer/entities/answer.entity';
import { TaskService } from '../task/task.service';

@Injectable()
export class ProfileService {
  constructor(private taskService: TaskService) {}

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
}
