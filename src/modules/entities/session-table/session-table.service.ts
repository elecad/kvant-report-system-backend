import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { CreateSessionTableDto } from './dto/create-session-table.dto';
import { UpdateSessionTableDto } from './dto/update-session-table.dto';
import { SessionTable } from './entities/session-table.entity';

@Injectable()
export class SessionTableService {
  constructor(
    @InjectModel(SessionTable) private repository: typeof SessionTable,
  ) {}

  entityName = 'Сессия';

  async create(сreateSessionTableDto: CreateSessionTableDto) {
    return this.repository.create(сreateSessionTableDto);
  }

  findAll(option: FindOptions<SessionTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<SessionTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(id: number, updateSessionTableDto: UpdateSessionTableDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    return entity.update(updateSessionTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<SessionTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(SessionTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<SessionTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(SessionTable, this.entityName, props);
  }
}
