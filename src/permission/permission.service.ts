import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from 'src/account/account.model';
import { Role } from 'src/role/role.model';
import { addPermissionDto } from './dto/add-permission.dto';
import { Permission } from './permission.model';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission) private permissionRepository: typeof Permission,
    @InjectModel(Account) private accountRepository: typeof Account,
    @InjectModel(Role) private roleRepository: typeof Role,
  ) {}

  async add(dto: addPermissionDto) {
    const account = await this.accountRepository.findOne({
      where: { mail: dto.mail },
      include: { all: true },
    });
    if (!account)
      throw new HttpException(
        'Аккаунт с такой электронной почтой не существует',
        HttpStatus.BAD_REQUEST,
      );

    const role = await this.roleRepository.findOne({
      where: { name: dto.name },
    });

    if (!role)
      throw new HttpException('Роль не найдена', HttpStatus.BAD_REQUEST);

    if (
      account.permissions.findIndex((r) => {
        return r.name === role.name;
      }) > -1
    )
      throw new HttpException(
        'Такая роль у аккаунта уже имеется',
        HttpStatus.BAD_REQUEST,
      );

    const permission = await this.permissionRepository.create({
      account_id: account.id,
      role_id: role.id,
    });

    return { id: permission.id };
  }

  async remove(dto: addPermissionDto) {
    const account = await this.accountRepository.findOne({
      where: { mail: dto.mail },
      include: { all: true },
    });
    if (!account)
      throw new HttpException(
        'Аккаунт с такой электронной почтой не существует',
        HttpStatus.BAD_REQUEST,
      );

    const role = account.permissions.find((r) => {
      return r.name === dto.name;
    });
    console.log(role);

    if (!role)
      throw new HttpException(
        'Роль у аккаунта не найдена',
        HttpStatus.BAD_REQUEST,
      );

    await role.destroy();

    return;
  }
}
