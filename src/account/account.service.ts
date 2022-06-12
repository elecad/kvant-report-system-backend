import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from './account.model';
import { createAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account) private accountRepository: typeof Account,
  ) {}

  async getAllAccount() {
    const accounts = await this.accountRepository.findAll();
    return accounts;
  }

  async getByIdAccount(id: number) {
    const accounts = await this.accountRepository.findByPk(id);
    return accounts;
  }

  async createAccount(dto: createAccountDto) {
    try {
      const account = await this.accountRepository.create(dto);
      return account;
    } catch {
      throw new HttpException('Ошибка добавления', HttpStatus.BAD_REQUEST);
    }
  }

  async updateAccount(id, dto) {
    try {
      const account = await this.accountRepository.findByPk(id);
      await account.update(dto);
      return account;
    } catch {
      throw new HttpException('Ошибка изменения', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteAccount(id) {
    try {
      const account = await this.accountRepository.findByPk(id);
      await account.destroy();
      return account;
    } catch {
      throw new HttpException('Ошибка удаления', HttpStatus.BAD_REQUEST);
    }
  }
}
