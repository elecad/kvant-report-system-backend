import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account) private accountRepository: typeof Account,
  ) {}

  private entityName = 'Аккаунт';

  async create(createAccountDto: CreateAccountDto) {
    await this.validateOne({
      type: 'unique',
      column: 'email',
      value: createAccountDto.email,
    });
    const { id } = await this.accountRepository.create(createAccountDto);
    return { id };
  }

  findAll(option: FindOptions<Account> = {}) {
    return this.accountRepository.findAll(option);
  }

  findOne(option: FindOptions<Account> = {}) {
    return this.accountRepository.findOne(option);
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });
    if (!(entity.email === updateAccountDto.email))
      await this.validateOne({
        type: 'unique',
        column: 'email',
        value: updateAccountDto.email,
      });

    await entity.update(updateAccountDto);
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

  async validateOne(props: ValidateOption<Account>) {
    //? Одиночный валидатор
    return databaseValidateOne(Account, this.entityName, props);
  }

  async validateAll(props: ValidateOption<Account>[]) {
    //? Групповой валидатор
    return databaseValidateAll(Account, this.entityName, props);
  }
}
