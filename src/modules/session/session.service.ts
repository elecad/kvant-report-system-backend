import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { v4 as uuid } from 'uuid';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session) private sessionRepository: typeof Session,
  ) {}

  entityName = 'Сессия';
  findAll(option: FindOptions<Session> = {}) {
    return this.sessionRepository.findAll(option);
  }

  findOne(option: FindOptions<Session> = {}) {
    return this.sessionRepository.findOne(option);
  }

  async create(account_id: number) {
    const token = uuid();
    const entity = await this.sessionRepository.create({ token, account_id });
    return entity;
  }

  async remove(token: string) {
    const entity = await this.validateOne({
      column: 'token',
      type: 'existing',
      value: token,
    });
    await entity.destroy();
  }

  async validateOne(props: ValidateOption<Session>) {
    //? Одиночный валидатор
    return databaseValidateOne(Session, this.entityName, props);
  }
}
