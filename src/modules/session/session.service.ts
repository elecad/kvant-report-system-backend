import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { Session, SessionCreateAttr } from './entities/session.entity';
import { v4 as uuid, validate as uuidValidate } from 'uuid';
import { STRINGS } from 'src/res/strings';
import {
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';

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
    this.validation(token);
    const entity = await this.validateOne({
      column: 'token',
      type: 'existing',
      value: token,
    });
    await entity.destroy();
  }

  private async validation(token: string) {
    if (!uuidValidate(token)) {
      throw new HttpException(STRINGS.IsNotValidUUID, HttpStatus.BAD_REQUEST);
    }
  }

  async validateOne(props: ValidateOption<Session>) {
    //? Одиночный валидатор
    return databaseValidateOne(Session, this.entityName, props);
  }
}
