import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { Session, SessionCreateAttr } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session) private sessionRepository: typeof Session,
  ) {}

  findAll(option: FindOptions<Session> = {}) {
    return this.sessionRepository.findAll(option);
  }

  findOne(option: FindOptions<Session> = {}) {
    return this.sessionRepository.findOne(option);
  }

  async create(createSession: SessionCreateAttr) {
    const entity = await this.sessionRepository.create(createSession);
    return entity;
  }

  async remove(token: string) {
    const entity = await this.findOne({ where: { token } });
    await entity.destroy();
  }
}
