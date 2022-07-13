import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import {
  CheckEntityProps,
  ValidateAllProps,
  ValidateOneProps,
} from 'src/types/validate.type';
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
      options: { collumn: 'email', value: createAccountDto.email },
    });
    const entity = await this.accountRepository.create(createAccountDto);
    return { id: entity.id };
  }

  findAll(option: FindOptions<Account> = {}) {
    return this.accountRepository.findAll(option);
  }

  findOne(option: FindOptions<Account> = {}) {
    return this.accountRepository.findOne(option);
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  async temp() {
    const accounts = await this.validateOne({
      type: 'unique',
      options: { collumn: 'email', value: 'test@mail.ru' },
    });
    // console.log(accounts);

    // return account;
  }

  async validateOne(props: ValidateOneProps<Account>) {
    //? Для одной сущности
    const {
      type,
      options: { value, collumn },
    } = props;
    const entity = await this.findOne({ where: { [collumn]: value } });

    this.checkEntity({ type, collumn: collumn, data: entity });

    return entity;
  }

  async validateAll(props: ValidateAllProps<Account>) {
    //? Для многих сущностей
    const { type, options } = props;
    const entitys = await Promise.all(
      options.map(({ collumn, value }) =>
        this.accountRepository.findOne({ where: { [collumn]: value } }),
      ),
    );

    entitys.forEach((e, index) => {
      this.checkEntity({ type, collumn: options[index].collumn, data: e });
    });

    return entitys;
  }

  private checkEntity({ type, collumn, data }: CheckEntityProps) {
    if (type === 'existing' && !data)
      throw new HttpException(
        `${this.entity} с таким ${collumn} отсутсвует в системе`,
        HttpStatus.BAD_REQUEST,
      );
    if (type === 'unique' && data)
      throw new HttpException(
        `${this.entity} с таким ${collumn} уже имеется в системе`,
        HttpStatus.BAD_REQUEST,
      );
  }
}
