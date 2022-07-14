import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { STRINGS } from 'src/res/strings';
import { CheckEntityProps, ValidateOption } from 'src/types/validate.type';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account) private accountRepository: typeof Account,
  ) {}

  private entity = 'Аккаунт';

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
    const [entity] = await this.validateAll([
      {
        type: 'existing',
        column: 'id',
        value: id,
      },
      {
        type: 'unique',
        column: 'email',
        value: updateAccountDto.email,
      },
    ]);
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
    //? Для одной сущности
    const { type, value, column } = props;
    const entity = await this.findOne({ where: { [column]: value } });

    this.checkEntity({ type, column, data: entity });

    return entity;
  }

  async validateAll(props: ValidateOption<Account>[]) {
    //? Для многих сущностей
    const entitys = await Promise.all(
      props.map(({ column, value }) =>
        this.accountRepository.findOne({ where: { [column]: value } }),
      ),
    );

    entitys.forEach((e, index) => {
      const { type, column } = props[index];
      this.checkEntity({
        type: type,
        column,
        data: e,
      });
    });

    return entitys;
  }

  private checkEntity({ type, column, data }: CheckEntityProps) {
    if (type === 'existing' && !data)
      throw new HttpException(
        STRINGS.IsExistingError(this.entity, column),
        HttpStatus.BAD_REQUEST,
      );
    if (type === 'unique' && data)
      throw new HttpException(
        STRINGS.IsUniqueError(this.entity, column),
        HttpStatus.BAD_REQUEST,
      );
  }
}
