import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { CreateReportTemplateTableDto } from './dto/create-report-template-table.dto';
import { UpdateReportTemplateTableDto } from './dto/update-report-template-table.dto';
import { ReportTemplateTable } from './entities/report-template-table.entity';

@Injectable()
export class ReportTemplateTableService {
  constructor(
    @InjectModel(ReportTemplateTable)
    private repository: typeof ReportTemplateTable,
  ) {}

  entityName = 'Шоблон отчёта';

  async create(createReportTemplateTableDto: CreateReportTemplateTableDto) {
    return this.repository.create(createReportTemplateTableDto);
  }

  findAll(option: FindOptions<ReportTemplateTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<ReportTemplateTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(
    id: number,
    updateReportTemplateTableDto: UpdateReportTemplateTableDto,
  ) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    return entity.update(updateReportTemplateTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<ReportTemplateTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(ReportTemplateTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<ReportTemplateTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(ReportTemplateTable, this.entityName, props);
  }
}
