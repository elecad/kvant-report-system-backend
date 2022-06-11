import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from './account.model';
import { createAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account) private accountRepository: typeof Account,
  ) {}

  async createAccount(dto: createAccountDto) {
    const account = this.accountRepository.create(dto);
    return account;
  }
}
