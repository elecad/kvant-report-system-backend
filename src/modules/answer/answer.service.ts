import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AuthDependency,
  AuthUser,
} from 'src/guards/auth-guard/interfaces/auth.interface';
import { STRINGS } from 'src/res/strings';
import { validationArray } from 'src/utils/validation-array.util';
import { AboutDependencyTableService } from '../entities/about-dependency-table/about-dependency-table.service';
import { AboutProgrammTableService } from '../entities/about-programm-table/about-programm-table.service';
import { AnswerTableService } from '../entities/answer-table/answer-table.service';
import { ReportService } from '../report/report.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    private readonly answerTableService: AnswerTableService,
    private readonly reportService: ReportService,
    private readonly aboutDependencyTableService: AboutDependencyTableService,
    private readonly aboutProgrammTableService: AboutProgrammTableService,
  ) {}
  async create(
    createAnswerDto: CreateAnswerDto,
    user: AuthUser,
    validDependencies: AuthDependency[],
  ) {
    //! dependencies validate
    validationArray({
      validate: createAnswerDto.dependencies.map((d) => d.dependency_id),
      exemple: validDependencies.map((d) => d.id),
      messages: {
        IsRepeatError: STRINGS.DependencyRepeatError,
        IsNotMatchingExempleError: STRINGS.DependencyNotMatchingTemplateError,
      },
    });

    const template = await this.reportService.getTemplate();

    for (const clientDependency of createAnswerDto.dependencies) {
      const dependency = validDependencies.find(
        (d) => clientDependency.dependency_id === d.id,
      );

      if (!template[dependency.dependency_type.code_name])
        throw new BadRequestException(STRINGS.TemplateDependencyTypeError);

      //! about-dependency check
      validationArray({
        validate: clientDependency.about_dependency.map(
          (d) => d.data_of_type_id,
        ),
        exemple: template[dependency.dependency_type.code_name].map(
          (t) => t.id,
        ),
        messages: {
          IsRepeatError: STRINGS.DataOfTypeDependencyRepeatError(dependency.id),
          IsNotMatchingExempleError:
            STRINGS.DataOfTypeDependencyNotMatchingTemplateError(dependency.id),
        },
      });

      //! programm check
      validationArray({
        validate: clientDependency.programms.map((p) => p.programm_id),
        exemple: dependency.programms.map((p) => p.id),
        messages: {
          IsRepeatError: STRINGS.ProgrammDependencyRepeatError(dependency.id),
          IsNotMatchingExempleError:
            STRINGS.ProgrammDependencyNotMatchingTemplateError(dependency.id),
        },
      });

      for (const clientProgramm of clientDependency.programms) {
        //! about-programm check
        validationArray({
          validate: clientProgramm.about_programm.map((a) => a.data_of_type_id),
          exemple: template.programm.map((a) => a.id),
          messages: {
            IsRepeatError: STRINGS.DataOfTypeProgrammRepeatError(dependency.id),
            IsNotMatchingExempleError:
              STRINGS.DataOfTypeProgrammNotMatchingTemplateError(dependency.id),
          },
        });
      }
    }

    const answer = await this.answerTableService.create({
      task_id: createAnswerDto.task_id,
      responder_id: user.id,
    });

    for (const dependency of createAnswerDto.dependencies) {
      for (const aboutDependency of dependency.about_dependency) {
        await this.aboutDependencyTableService.create({
          answer_id: answer.id,
          data_of_type_id: aboutDependency.data_of_type_id,
          dependency_id: dependency.dependency_id,
          value: aboutDependency.value,
        });
      }

      for (const programm of dependency.programms) {
        for (const aboutProgramm of programm.about_programm) {
          await this.aboutProgrammTableService.create({
            answer_id: answer.id,
            data_of_type_id: aboutProgramm.data_of_type_id,
            programm_id: programm.programm_id,
            value: aboutProgramm.value,
          });
        }
      }
    }
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }
}
