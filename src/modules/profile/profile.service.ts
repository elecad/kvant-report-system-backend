import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  AuthDependency,
  AuthUser,
} from 'src/guards/auth-guard/interfaces/auth.interface';
import { STRINGS } from 'src/res/strings';
import { AboutDependencyService } from '../about_dependency/about_dependency.service';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entities/account.entity';
import { Answer } from '../answer/entities/answer.entity';
import { DataOfType } from '../data_of_type/entities/data_of_type.entity';
import { ProgrammService } from '../programm/programm.service';
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
    private programmService: ProgrammService,
    private accountService: AccountService,
  ) {}

  async getProfileInfo(user: AuthUser) {
    return this.accountService.getProfile(user);
  }

  async getTasksByUser({ id }: AuthUser) {
    return this.taskService.getTasksByUserID(id);
  }

  async getDependencyByTaskId(task_id: number, user: AuthUser) {
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

  async addAnswer(user: AuthUser, addAnswerDto: AddAnswerDto) {
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
    usersDependencies: AuthDependency[],
  ) {
    //! dependencies-check
    this.validationArray<AddAnswerDependency, AuthDependency>({
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

    //! Hello sync in forEach
    for (const d of usersDependencies) {
      const currenAnswerDependency = addAnswerDto.dependencies.find(
        (el) => d.id === el.dependency_id,
      );

      if (!currenAnswerDependency)
        this.throwBadRequestException(
          'Ошибка при поиске Dependency в запросе при валидации',
        );

      switch (d.dependency_type.name) {
        case 'Район':
          this.validationArray<AddAnswerAbout, DataOfType>({
            validate: {
              array: currenAnswerDependency.about_dependency,
              key: 'data_of_type_id',
            },
            messages: {
              IsRepeatError: 'Обнаружены повторения в Типах Данных Зависимости',
              IsNotMatchingExemple:
                'Обнаружено несоответсвие с Типами данных, требуемыми для Отчёта (О Зависимостях, Тип: Район)',
            },
            exemple: {
              array: templates.area.data_of_type,
              key: 'id',
            },
          });
          break;
        case 'Учереждение дополнительного образования':
          this.validationArray<AddAnswerAbout, DataOfType>({
            validate: {
              array: currenAnswerDependency.about_dependency,
              key: 'data_of_type_id',
            },
            messages: {
              IsRepeatError: 'Обнаружены повторения в Типах Данных Зависимости',
              IsNotMatchingExemple:
                'Обнаружено несоответсвие с Типами данных, требуемыми для Отчёта (О Зависимостях, Тип: Учереждение дополнительного образования)',
            },
            exemple: {
              array: templates.school.data_of_type,
              key: 'id',
            },
          });
          break;
        default:
          this.throwBadRequestException(
            'Ошибка при проверке данных в about_dependency',
          );
      }

      for (const p of currenAnswerDependency.programms) {
        this.validationArray<AddAnswerAbout, DataOfType>({
          validate: {
            array: p.about_programm,
            key: 'data_of_type_id',
          },
          messages: {
            IsRepeatError: 'Обнаружены повторения в Типах Данных Программы',
            IsNotMatchingExemple:
              'Обнаружено несоответсвие с Типами данных, требуемыми для Отчёта (О Программах)',
          },
          exemple: {
            array: templates.programm.data_of_type,
            key: 'id',
          },
        });

        await this.programmService.validateOne({
          column: 'id',
          type: 'existing',
          value: p.programm_id,
        });
      }
    }
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
    // console.log(
    //   'validate',
    //   validate.array.map((el) => el[validate.key]),
    // );
    // console.log(
    //   'exemple',
    //   exemple.array.map((el) => el[exemple.key]),
    // );

    const unique = new Set(validate.array.map((el) => el[validate.key]));

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
