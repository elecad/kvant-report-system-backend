import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from 'src/entity/account/account.model';
import { AccountService } from 'src/entity/account/account.service';
import { Role } from '../role/role.model';
import { RoleService } from '../role/role.service';
import { addPermissionDto } from './dto/add-permission.dto';
import { Permission } from './permission.model';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission) private permissionRepository: typeof Permission,
    private accountService: AccountService,
    private roleService: RoleService,
  ) {}

  accontHasRole(account: Account, role: Role) {
    if (
      account.permissions.findIndex((r) => {
        return r.name === role.name;
      }) > -1
    )
      throw new HttpException(
        'Такая роль у аккаунта уже имеется',
        HttpStatus.BAD_REQUEST,
      );
  }

  async add(dto: addPermissionDto) {
    const account = await this.accountService.getById({
      id: dto.account_id,
      include: Role,
    });
    const role = await this.roleService.getById(dto.role_id);

    this.accontHasRole(account, role);

    const permission = await this.permissionRepository.create(dto);

    return { id: permission.id };
  }

  async remove(dto: addPermissionDto) {
    const account = await this.accountService.getById({
      id: dto.account_id,
      include: Role,
    });

    const role = await this.roleService.getById(dto.role_id);

    const permission = await this.getByAccountAndRole(account.id, role.id);

    permission.destroy();
  }

  async getById(id: number) {
    const permission = await this.permissionRepository.findByPk(id);
    if (!permission)
      throw new HttpException(
        'Привелегии с таким ID не найдено',
        HttpStatus.BAD_REQUEST,
      );
    return permission;
  }

  async getByAccountAndRole(account_id: number, role_id: number) {
    const permission = await this.permissionRepository.findOne({
      where: { account_id, role_id },
    });
    if (!permission)
      throw new HttpException(
        'Аккаунт не имеет такую роль',
        HttpStatus.BAD_REQUEST,
      );
    return permission;
  }
}