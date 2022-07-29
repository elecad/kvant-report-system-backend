import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
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

  async validateOne(props: ValidateOption<Report>) {
    //? Одиночный валидатор
    return databaseValidateOne(Report, this.entityName, props);
  }

  async validateAll(props: ValidateOption<Report>[]) {
    //? Групповой валидатор
    return databaseValidateAll(Report, this.entityName, props);
  }
}
