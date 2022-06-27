import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { Account } from 'src/entity/account/account.model';
import { Answer } from 'src/entity/answer/answer.model';
import { AnswerService } from 'src/entity/answer/answer.service';
import { PlaceDataService } from 'src/entity/place_data/place_data.service';
import { TaskService } from 'src/entity/task/task.service';

@Injectable()
export class ClientService {
  constructor(
    private taskService: TaskService,
    private answerService: AnswerService,
    private placeDataService: PlaceDataService,
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

  async getPlaceTask(id: Number, user: AuthDto) {
    const isValid = await Promise.all(
      user.places.map((place) =>
        this.placeDataService.getOne({
          include: { model: Answer, where: { task_id: id } },
          where: { place_id: place.id },
          attributes: ['id'],
        }),
      ),
    );

    return user.places.filter((_, index) => {
      return !isValid[index];
    });
  }
}
