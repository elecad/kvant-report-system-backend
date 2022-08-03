import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  IDependency,
  IUser,
} from 'src/guards/auth-guard/interfaces/auth.interface';
import { STRINGS } from 'src/res/strings';
import { AboutDependencyService } from '../about_dependency/about_dependency.service';
import { Account } from '../account/entities/account.entity';
import { Answer } from '../answer/entities/answer.entity';
import { DataOfType } from '../data_of_type/entities/data_of_type.entity';
import { ReportService } from '../report/report.service';
import { TaskService } from '../task/task.service';
import {
  AddAnswerAbout,
  AddAnswerDependency,
  AddAnswerDto,
} from './dto/add-answer.dto';
import { ValidationArrayProps } from './interfaces/validaton-array.interface';

@Injectable()
export class ProfileService {
  constructor(
    private taskService: TaskService,
    private aboutDependencyService: AboutDependencyService,
    private reportService: ReportService,
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

  async addAnswer(user: IUser, addAnswerDto: AddAnswerDto) {
    await this.taskService.validateOne({
      column: 'id',
      type: 'existing',
      value: addAnswerDto.task_id,
    });

    const usersDependencies = await this.getDependencyByTaskId(
      addAnswerDto.task_id,
      user,
    );

    await this.validationAnswerDto(addAnswerDto, usersDependencies);

    return usersDependencies;
  }

  private async validationAnswerDto(
    addAnswerDto: AddAnswerDto,
    usersDependencies: IDependency[],
  ) {
    //! dependencies-check
    this.validationArray<AddAnswerDependency, IDependency>({
      validate: { array: addAnswerDto.dependencies, key: 'dependency_id' },
      messages: {
        IsRepeatError: 'Обнаружены повторения в Зависимостях',
        IsNotMatchingExemple:
          'Обнаружено несоответсвие с Зависимостями, требуемыми для Отчёта',
      },
      exemple: {
        array: usersDependencies,
        key: 'id',
      },
    });

    const templates = await this.getReportTemplate();

    //! about_dependency-check
    addAnswerDto.dependencies.forEach((d) => {
      this.validationArray<AddAnswerAbout, DataOfType>({
        validate: { array: d.about_dependency, key: 'data_of_type_id' },
        messages: {
          IsRepeatError: 'Обнаружены повторения в Типах Данных Зависимости',
          IsNotMatchingExemple:
            'Обнаружено несоответсвие с Типами данных, требуемыми для Отчёта (О Зависимостях)',
        },
        exemple: {
          array: templates.area.data_of_type,
          key: 'id',
        },
      });
    });
  }

  private throwBadRequestException(message: string) {
    throw new HttpException(
      {
        statusCode: 400,
        message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  private validationArray<T, E = any>({
    messages,
    validate,
    exemple,
  }: ValidationArrayProps<T, E>) {
    const unique = new Set(validate.array.map((el) => el[validate.key]));

    console.log(unique.size, validate.array.length);

    if (unique.size != validate.array.length)
      this.throwBadRequestException(messages.IsRepeatError ?? '');

    if (!exemple) return;

    if (unique.size != exemple.array.length)
      this.throwBadRequestException(messages.IsNotMatchingExemple ?? '');

    const exempleArray = exemple.array.map((el) => el[exemple.key]);
    unique.forEach((u) => {
      if (!exempleArray.includes(u))
        this.throwBadRequestException(messages.IsNotMatchingExemple ?? '');
    });
  }

  private async getReportTemplate() {
    const names = ['Таблица №2', 'Таблица №7.1', 'Таблица №7.2'];
    const templates = await Promise.all(
      names.map((name) =>
        this.reportService.findOne({
          where: { name },
          include: DataOfType,
        }),
      ),
    );
    const [area, school, programm] = templates;
    return {
      area,
      school,
      programm,
    };
  }
}
