import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  AuthDependency,
  AuthUser,
} from 'src/guards/auth-guard/interfaces/auth.interface';
import { STRINGS } from 'src/res/strings';
import { validationArray } from 'src/utils/validation-array.util';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { AboutDependencyService } from '../about_dependency/about_dependency.service';
import { AboutProgrammService } from '../about_programm/about_programm.service';
import { AccountService } from '../account/account.service';
import { DataOfType } from '../data_of_type/entities/data_of_type.entity';
import {
  AddAnswerAbout,
  AddAnswerDependency,
  AddAnswerDto,
} from '../profile/dto/add-answer.dto';
import { ProgrammService } from '../programm/programm.service';
import { ReportService } from '../report/report.service';
import { TaskService } from '../task/task.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer) private answerRepository: typeof Answer,

    @Inject(forwardRef(() => AccountService))
    private accountService: AccountService,
    private taskService: TaskService,
    private reportService: ReportService,
    @Inject(forwardRef(() => ProgrammService))
    private programmService: ProgrammService,
    private aboutProgrammService: AboutProgrammService,
    @Inject(forwardRef(() => AboutDependencyService))
    private aboutDependencyService: AboutDependencyService,
  ) {}

  private entityName = 'Ответ';

  async create(createAnswerDto: CreateAnswerDto) {
    await this.accountService.validateOne({
      type: 'existing',
      column: 'id',
      value: createAnswerDto.responder_id,
    });

    await this.taskService.validateOne({
      type: 'existing',
      column: 'id',
      value: createAnswerDto.task_id,
    });

    const { id } = await this.answerRepository.create(createAnswerDto);
    return { id };
  }

  findAll(option: FindOptions<Answer> = {}) {
    return this.answerRepository.findAll(option);
  }

  findOne(option: FindOptions<Answer> = {}) {
    return this.answerRepository.findOne(option);
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.responder_id !== updateAnswerDto.responder_id)
      await this.accountService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateAnswerDto.responder_id,
      });
    if (entity.task_id !== updateAnswerDto.task_id)
      await this.taskService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateAnswerDto.task_id,
      });
    await entity.update(updateAnswerDto);
    return entity;
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validationCreateAnswerDto(
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

    const templates = await this.reportService.getTemplate();

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

  async add(
    { id: responder_id }: AuthUser,
    { dependencies, task_id }: AddAnswerDto,
  ) {
    const answer = await this.create({ task_id, responder_id });

    for (const dependency of dependencies) {
      //! added about_dependency
      for (const about of dependency.about_dependency) {
        await this.aboutDependencyService.create({
          answer_id: answer.id,
          data_of_type_id: about.data_of_type_id,
          dependency_id: dependency.dependency_id,
          value: about.value,
        });
      }
      //! added about_programm
      for (const programm of dependency.programms) {
        for (const about of programm.about_programm) {
          await this.aboutProgrammService.create({
            answer_id: answer.id,
            data_of_type_id: about.data_of_type_id,
            programm_id: programm.programm_id,
            value: about.value,
          });
        }
      }
    }
  }

  async validateOne(props: ValidateOption<Answer>) {
    //? Одиночный валидатор
    return databaseValidateOne(Answer, this.entityName, props);
  }

  async validateAll(props: ValidateOption<Answer>[]) {
    //? Групповой валидатор
    return databaseValidateAll(Answer, this.entityName, props);
  }
}
