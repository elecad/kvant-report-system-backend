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

      const currentDependencyType =
        template[dependency.dependency_type.code_name];

      if (!currentDependencyType)
        throw new BadRequestException(STRINGS.TemplateDependencyTypeError);

      //! about-dependency check
      validationArray({
        validate: clientDependency.about_dependency.map(
          (d) => d.data_of_type_id,
        ),
        exemple: currentDependencyType.map((t) => t.id),
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

    const { id: answer_id } = await this.answerTableService.create({
      task_id: createAnswerDto.task_id,
      responder_id: user.id,
    });

    for (const {
      dependency_id,
      about_dependency,
      programms,
    } of createAnswerDto.dependencies) {
      for (const { data_of_type_id, value } of about_dependency) {
        await this.aboutDependencyTableService.create({
          answer_id,
          data_of_type_id,
          dependency_id,
          value,
        });
      }

      for (const { programm_id, about_programm } of programms) {
        for (const { data_of_type_id, value } of about_programm) {
          await this.aboutProgrammTableService.create({
            answer_id,
            data_of_type_id,
            programm_id,
            value,
          });
        }
      }
    }
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }
}
