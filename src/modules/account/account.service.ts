import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  databaseValidateAll,
  databaseValidateOne,
  ValidateOption,
} from 'src/validators/dataBase.validator';
import { DependencyService } from '../dependency/dependency.service';
import { Dependency } from '../dependency/entities/dependency.entity';
import { Role } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account) private accountRepository: typeof Account,
    private readonly roleService: RoleService,
    private readonly dependencyService: DependencyService,
  ) {}

  private entityName = 'Аккаунт';

  async create(createAccountDto: CreateAccountDto) {
    await this.validateOne({
      type: 'unique',
      column: 'email',
      value: createAccountDto.email,
    });

    const roles = await this.roleService.validateAll(
      createAccountDto.roles.map(
        (role): ValidateOption<Role> => ({
          type: 'existing',
          column: 'id',
          value: role,
        }),
      ),
    );

    const dependencies = await this.dependencyService.validateAll(
      createAccountDto.dependencies.map(
        (dependency): ValidateOption<Dependency> => ({
          type: 'existing',
          column: 'id',
          value: dependency,
        }),
      ),
    );

    const account = await this.accountRepository.create(createAccountDto);
    account.$set('roles', roles);
    account.$set('dependencies', dependencies);

    const { id } = account;
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

    if (entity.email !== updateAccountDto.email)
      await this.validateOne({
        type: 'unique',
        column: 'email',
        value: updateAccountDto.email,
      });

    const roles = await this.roleService.validateAll(
      updateAccountDto.roles.map(
        (role): ValidateOption<Role> => ({
          type: 'existing',
          column: 'id',
          value: role,
        }),
      ),
    );

    const dependencies = await this.dependencyService.validateAll(
      updateAccountDto.dependencies.map(
        (dependency): ValidateOption<Dependency> => ({
          type: 'existing',
          column: 'id',
          value: dependency,
        }),
      ),
    );

    const { roles: _, dependencies: __, ...updateAccount } = updateAccountDto;
    await entity.update(updateAccount);

    entity.$set('roles', roles);
    entity.$set('dependencies', dependencies);
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
