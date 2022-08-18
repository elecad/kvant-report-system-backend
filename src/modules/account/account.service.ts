import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { ValidateOption } from 'src/validators/database.validator';
import { AccountTableService } from '../entities/account-table/account-table.service';
import { DependencyTableService } from '../entities/dependency-table/dependency-table.service';
import { DependencyTable } from '../entities/dependency-table/entities/dependency-table.entity';
import { RoleTable } from '../entities/role-table/entities/role-table.entity';
import { RoleTableService } from '../entities/role-table/role-table.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountTableService: AccountTableService,
    private readonly roleTableService: RoleTableService,
    private readonly dependencyTableService: DependencyTableService,
  ) {}

  async create({ roles, dependencies, ...createAccount }: CreateAccountDto) {
    await this.accountTableService.validateOne({
      type: 'unique',
      column: 'email',
      value: createAccount.email,
    });

    const findRoles = await this.roleTableService.validateAll(
      roles.map(
        (r): ValidateOption<RoleTable> => ({
          type: 'existing',
          column: 'id',
          value: r,
        }),
      ),
    );

    const findDependencies = await this.dependencyTableService.validateAll(
      dependencies.map(
        (d): ValidateOption<DependencyTable> => ({
          type: 'existing',
          column: 'id',
          value: d,
        }),
      ),
    );

    const account = await this.accountTableService.create(createAccount);

    account.$set('roles', findRoles);
    account.$set('dependencies', findDependencies);

    return account;
  }

  async update(
    id: number,
    { roles, dependencies, ...updateAccount }: UpdateAccountDto,
  ) {
    const entity = await this.accountTableService.validateOne({
      type: 'existing',
      column: 'id',
      value: id,
    });

    if (entity.email !== updateAccount.email)
      await this.accountTableService.validateOne({
        type: 'unique',
        column: 'email',
        value: updateAccount.email,
      });

    const findRoles = await this.roleTableService.validateAll(
      roles.map(
        (r): ValidateOption<RoleTable> => ({
          type: 'existing',
          column: 'id',
          value: r,
        }),
      ),
    );

    const findDependencies = await this.dependencyTableService.validateAll(
      dependencies.map(
        (d): ValidateOption<DependencyTable> => ({
          type: 'existing',
          column: 'id',
          value: d,
        }),
      ),
    );

    const account = await this.accountTableService.create(updateAccount);

    account.$set('roles', findRoles);
    account.$set('dependencies', findDependencies);

    return account;
  }

  getProfile({ id, dependencies, ...profile }: AuthUser) {
    return {
      ...profile,
      dependencies: dependencies.map(
        ({ programms, ...dependency }) => dependency,
      ),
    };
  }
}
