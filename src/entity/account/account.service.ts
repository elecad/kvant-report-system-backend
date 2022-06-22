import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Includeable } from 'sequelize/types';
import { Control } from '../control/control.model';
import { Role } from '../role/role.model';
import { Account } from './account.model';
import { createAccountDto } from './dto/create-account.dto';

interface getIDProps {
  id: number;
  include?: Includeable | Includeable[];
}

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account) private accountRepository: typeof Account,
  ) {}

  async getAll() {
    const accounts = await this.accountRepository.findAll();
    return accounts;
  }

  async getById({ id, include }: getIDProps) {
    const account = await this.accountRepository.findByPk(
      id,
      include ? { include } : {},
    );
    if (!account)
      throw new HttpException(
        'Аккаунт с таким ID не найден',
        HttpStatus.BAD_REQUEST,
      );
    return account;
  }

  async getByEmail(email: string) {
    return await this.accountRepository.findOne({
      where: { mail: email },
    });
  }

  async create(dto: createAccountDto) {
    const candidat = await this.getByEmail(dto.mail);

    if (!candidat) {
      const account = await this.accountRepository.create(dto);
      return { id: account.id };
    }
  }

  async update(id, dto) {
    const candidat = await this.getById({ id, include: [] });
    const check = await this.getByEmail(dto.mail);

    candidat.update(dto);
  }

  async delete(id) {
    const candidat = await this.getById({ id, include: [] });

    if (candidat) {
      candidat.destroy();
    }
  }
}