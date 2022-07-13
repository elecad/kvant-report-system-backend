import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
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
    const entity = await this.accountRepository.create(createAccountDto);
    return { id: entity.id };
  }

  findAll(option: FindOptions<Account> = {}) {
    return this.accountRepository.findAll(option);
  }

  findOne(option: FindOptions<Account> = {}) {
    return this.accountRepository.findOne(option);
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    // await this.validateOne({
    //   type: 'unique',
    //   collumn: 'email',
    //   value: updateAccountDto.email,
    // });

    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
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
