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
      collumn: 'email',
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
        collumn: 'id',
        value: id,
      },
      {
        type: 'unique',
        collumn: 'email',
        value: updateAccountDto.email,
      },
    ]);
    await entity.update(updateAccountDto);

    return entity;
  }

  async remove(id: number) {
    const entity = await this.validateOne({
      type: 'existing',
      collumn: 'id',
      value: id,
    });

    await entity.destroy();
  }

  async validateOne(props: ValidateOption<Account>) {
    //? Для одной сущности
    const { type, value, collumn } = props;
    const entity = await this.findOne({ where: { [collumn]: value } });

    this.checkEntity({ type, collumn: collumn, data: entity });

    return entity;
  }

  async validateAll(props: ValidateOption<Account>[]) {
    //? Для многих сущностей
    const entitys = await Promise.all(
      props.map(({ collumn, value }) =>
        this.accountRepository.findOne({ where: { [collumn]: value } }),
      ),
    );

    entitys.forEach((e, index) => {
      const { type, collumn } = props[index];
      this.checkEntity({
        type: type,
        collumn: collumn,
        data: e,
      });
    });

    return entitys;
  }

  private checkEntity({ type, collumn, data }: CheckEntityProps) {
    if (type === 'existing' && !data)
      throw new HttpException(
        STRINGS.IsExistingError(this.entity, collumn),
        HttpStatus.BAD_REQUEST,
      );
    if (type === 'unique' && data)
      throw new HttpException(
        STRINGS.IsUniqueError(this.entity, collumn),
        HttpStatus.BAD_REQUEST,
      );
  }
}
