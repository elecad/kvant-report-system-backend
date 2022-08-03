import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { DataOfType } from '../data_of_type/entities/data_of_type.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(@InjectModel(Report) private reportRepository: typeof Report) {}

  private entityName = 'Отчёт';

  async create(createReportDto: CreateReportDto) {
    const { id } = await this.reportRepository.create(createReportDto);
    return { id };
  }

  findAll(option: FindOptions<Report> = {}) {
    return this.reportRepository.findAll(option);
  }

  findOne(option: FindOptions<Report> = {}) {
    return this.reportRepository.findOne(option);
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.update(updateReportDto);
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

  private async getTemplate() {
    const names = ['Таблица №2', 'Таблица №7.1', 'Таблица №7.2'];
    const templates = await Promise.all(
      names.map((name) =>
        this.findOne({
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

  async validateOne(props: ValidateOption<Report>) {
    //? Одиночный валидатор
    return databaseValidateOne(Report, this.entityName, props);
  }

  async validateAll(props: ValidateOption<Report>[]) {
    //? Групповой валидатор
    return databaseValidateAll(Report, this.entityName, props);
  }
}
