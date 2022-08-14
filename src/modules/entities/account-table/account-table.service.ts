import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/database.validator';
import { CreateAccountTableDto } from './dto/create-account-table.dto';
import { UpdateAccountTableDto } from './dto/update-account-table.dto';
import { AccountTable } from './entities/account-table.entity';

@Injectable()
export class AccountTableService {
  constructor(
    @InjectModel(AccountTable) private repository: typeof AccountTable,
  ) {}

  entityName = 'Аккаунт';

  async create(createAccountTableDto: CreateAccountTableDto) {
    const { email } = createAccountTableDto;
    await this.validateOne({ column: 'email', type: 'unique', value: email });
    return this.repository.create(createAccountTableDto);
  }

  findAll(option: FindOptions<AccountTable> = {}) {
    return this.repository.findAll(option);
  }

  findOne(option: FindOptions<AccountTable> = {}) {
    return this.repository.findOne(option);
  }

  async update(id: number, updateAccountTableDto: UpdateAccountTableDto) {
    const { email } = updateAccountTableDto;

    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.email !== email)
      await this.validateOne({
        type: 'unique',
        column: 'email',
        value: email,
      });

    return entity.update(updateAccountTableDto);
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<AccountTable>) {
    //? Одиночный валидатор
    return databaseValidateOne(AccountTable, this.entityName, props);
  }

  async validateAll(props: ValidateOption<AccountTable>[]) {
    //? Групповой валидатор
    return databaseValidateAll(AccountTable, this.entityName, props);
  }
}
