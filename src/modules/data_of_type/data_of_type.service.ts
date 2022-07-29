import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { Report } from '../report/entities/report.entity';
import { ReportService } from '../report/report.service';
import { CreateDataOfTypeDto } from './dto/create-data_of_type.dto';
import { UpdateDataOfTypeDto } from './dto/update-data_of_type.dto';
import { DataOfType } from './entities/data_of_type.entity';

@Injectable()
export class DataOfTypeService {
  constructor(
    @InjectModel(DataOfType) private dataOfTypeRepository: typeof DataOfType,
    private reportService: ReportService,
  ) {}

  private entityName = 'Тип данных';

  async create(createDataOfTypeDto: CreateDataOfTypeDto) {
    await this.reportService.validateOne({
      type: 'existing',
      column: 'id',
      value: createDataOfTypeDto.report_id,
    });

    const { id } = await this.dataOfTypeRepository.create(createDataOfTypeDto);
    return { id };
  }

  findAll(option: FindOptions<DataOfType> = {}) {
    return this.dataOfTypeRepository.findAll(option);
  }

  findOne(option: FindOptions<DataOfType> = {}) {
    return this.dataOfTypeRepository.findOne(option);
  }

  async update(id: number, updateDataOfTypeDto: UpdateDataOfTypeDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.report_id !== updateDataOfTypeDto.report_id)
      await this.reportService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateDataOfTypeDto.report_id,
      });

    await entity.update(updateDataOfTypeDto);
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

  async validateOne(props: ValidateOption<DataOfType>) {
    //? Одиночный валидатор
    return databaseValidateOne(DataOfType, this.entityName, props);
  }

  async validateAll(props: ValidateOption<DataOfType>[]) {
    //? Групповой валидатор
    return databaseValidateAll(DataOfType, this.entityName, props);
  }
}
