import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from './account.model';
import { createAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account) private accountRepository: typeof Account,
  ) {}

  async getAll() {
    const accounts = await this.accountRepository.findAll();
    return accounts;
  }

  async getById(id: number, withRole: boolean) {
    const account = await this.accountRepository.findByPk(
      id,
      withRole ? { include: { all: true } } : {},
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
    throw new HttpException(
      'Аккаунт с такой электронной почтой уже существует',
      HttpStatus.BAD_REQUEST,
    );
  }

  async update(id, dto) {
    const candidat = await this.getById(id, false);
    const check = await this.getByEmail(dto.mail);

    if (check)
      throw new HttpException(
        'Аккаунт с такой электронной почтой уже существует',
        HttpStatus.BAD_REQUEST,
      );

    candidat.update(dto);
  }

  async delete(id) {
    const candidat = await this.getById(id, false);

    if (candidat) {
      candidat.destroy();
    }
  }
}
