import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AuthDependency,
  AuthUser,
} from 'src/guards/auth-guard/interfaces/auth.interface';
import { STRINGS } from 'src/res/strings';
import { validationArray } from 'src/utils/validation-array.util';
import { AboutDependencyService } from '../about_dependency/about_dependency.service';
import { AccountService } from '../account/account.service';
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
    private reportService: ReportService,
    private programmService: ProgrammService,
    private accountService: AccountService,
    private dependencyService: DependencyService,
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

    await this.validationAnswerDto(addAnswerDto, usersDependencies);

    return usersDependencies;
  }

  private async validationAnswerDto(
    { dependencies: clientDependency, task_id }: AddAnswerDto,
    usersDependencies: AuthDependency[],
  ) {
    //! task-check
    await this.taskService.validateOne({
      column: 'id',
      type: 'existing',
      value: task_id,
    });

    //! dependencies-check
    validationArray<AddAnswerDependency, AuthDependency>({
      validate: { array: clientDependency, key: 'dependency_id' },
      messages: {
        IsRepeatError: STRINGS.IsRepeatDependencyError,
        IsNotMatchingExempleError: STRINGS.IsNotMatchingDependencyError,
      },
      exemple: {
        array: usersDependencies,
        key: 'id',
      },
    });

    const templates = await this.getReportTemplate();

    //! Hello sync in forEach
    for (const d of usersDependencies) {
      const currenAnswerDependency = clientDependency.find(
        (el) => d.id === el.dependency_id,
      );

      if (!currenAnswerDependency)
        throw new BadRequestException(STRINGS.DependencySearchError);

      switch (d.dependency_type.name) {
        case STRINGS.AreaDependencyType:
          validationArray<AddAnswerAbout, DataOfType>({
            validate: {
              array: currenAnswerDependency.about_dependency,
              key: 'data_of_type_id',
            },
            messages: {
              IsRepeatError: STRINGS.IsRepeatAboutDependencyError,
              IsNotMatchingExempleError:
                STRINGS.IsNotMatchingAboutDependencyError(
                  STRINGS.AreaDependencyType,
                ),
            },
            exemple: {
              array: templates.area,
              key: 'id',
            },
          });
          break;
        case STRINGS.SchoolDependencyType:
          validationArray<AddAnswerAbout, DataOfType>({
            validate: {
              array: currenAnswerDependency.about_dependency,
              key: 'data_of_type_id',
            },
            messages: {
              IsRepeatError: STRINGS.IsRepeatAboutDependencyError,
              IsNotMatchingExempleError:
                STRINGS.IsNotMatchingAboutDependencyError(
                  STRINGS.AreaDependencyType,
                ),
            },
            exemple: {
              array: templates.school,
              key: 'id',
            },
          });
          break;
        default:
          throw new BadRequestException(STRINGS.CheckAboutDependencyTypeError);
      }

      for (const {
        programm_id,
        about_programm,
      } of currenAnswerDependency.programms) {
        validationArray<AddAnswerAbout, DataOfType>({
          validate: {
            array: about_programm,
            key: 'data_of_type_id',
          },
          messages: {
            IsRepeatError: STRINGS.IsRepeatDataOfTypeProgrammError,
            IsNotMatchingExempleError:
              STRINGS.IsNotMatchingDataOfTypeProgrammError,
          },
          exemple: {
            array: templates.programm,
            key: 'id',
          },
        });

        await this.programmService.validateOne({
          column: 'id',
          type: 'existing',
          value: programm_id,
        });
      }
    }
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
      area: area.data_of_type,
      school: school.data_of_type,
      programm: programm.data_of_type,
    };
  }
}
