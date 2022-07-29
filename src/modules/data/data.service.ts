import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { DataOfTypeService } from '../data_of_type/data_of_type.service';
import { DataOfType } from '../data_of_type/entities/data_of_type.entity';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { Datum } from './entities/datum.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectModel(Datum) private datumRepository: typeof Datum,
    private dataOfTypeService: DataOfTypeService,
  ) {}

  private entityName = 'Данные';

  async create(createDatumDto: CreateDatumDto) {
    await this.dataOfTypeService.validateOne({
      type: 'existing',
      column: 'id',
      value: createDatumDto.data_of_type_id,
    });

    const { id } = await this.datumRepository.create(createDatumDto);
    return { id };
  }

  findAll(option: FindOptions<Datum> = {}) {
    return this.datumRepository.findAll(option);
  }

  findOne(option: FindOptions<Datum> = {}) {
    return this.datumRepository.findOne(option);
  }

  async update(id: number, updateDatumDto: UpdateDatumDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.data_of_type_id !== updateDatumDto.data_of_type_id)
      await this.dataOfTypeService.validateOne({
        type: 'existing',
        column: 'id',
        value: updateDatumDto.data_of_type_id,
      });

    await entity.update(updateDatumDto);
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

  async validateOne(props: ValidateOption<Datum>) {
    //? Одиночный валидатор
    return databaseValidateOne(Datum, this.entityName, props);
  }

  async validateAll(props: ValidateOption<Datum>[]) {
    //? Групповой валидатор
    return databaseValidateAll(Datum, this.entityName, props);
  }
}
