import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { ReportTemplateTableService } from '../report-template-table/report-template-table.service';
import { CreateDataOfTypeTableDto } from './dto/create-data-of-type-table.dto';
import { UpdateDataOfTypeTableDto } from './dto/update-data-of-type-table.dto';
import { DataOfTypeTable } from './entities/data-of-type-table.entity';

@Injectable()
export class DataOfTypeTableService {
  constructor(
    @InjectModel(DataOfTypeTable) private repository: typeof DataOfTypeTable,
    private readonly reportTemplateTableService: ReportTemplateTableService,
  ) {}

  entityName = 'Тип данных';

  async create(createDataOfTypeTableDto: CreateDataOfTypeTableDto) {
    const { template_id } = createDataOfTypeTableDto;

    await this.reportTemplateTableService.validateOne({
      column: 'id',
      type: 'unique',
      value: template_id,
    });

    return this.repository.create(createDataOfTypeTableDto);
  }

  findAll(option: FindOptions<DataOfTypeTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<DataOfTypeTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(id: number, updateDataOfTypeTableDto: UpdateDataOfTypeTableDto) {
    const { template_id } = updateDataOfTypeTableDto;

    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.template_id !== template_id)
      await this.reportTemplateTableService.validateOne({
        column: 'id',
        type: 'unique',
        value: template_id,
      });

    return entity.update(updateDataOfTypeTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<DataOfTypeTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(DataOfTypeTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<DataOfTypeTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(DataOfTypeTable, this.entityName, props);
  }
}
