import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { CreateDirectionTableDto } from './dto/create-direction-table.dto';
import { UpdateDirectionTableDto } from './dto/update-direction-table.dto';
import { DirectionTable } from './entities/direction-table.entity';

@Injectable()
export class DirectionTableService {
  constructor(
    @InjectModel(DirectionTable) private repository: typeof DirectionTable,
  ) {}

  entityName = 'Направление';

  async create(createDirectionTableDto: CreateDirectionTableDto) {
    return this.repository.create(createDirectionTableDto);
  }

  findAll(option: FindOptions<DirectionTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<DirectionTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(id: number, updateDirectionTableDto: UpdateDirectionTableDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    return entity.update(updateDirectionTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<DirectionTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(DirectionTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<DirectionTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(DirectionTable, this.entityName, props);
  }
}
