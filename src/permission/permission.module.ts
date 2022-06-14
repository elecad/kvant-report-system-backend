import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from 'src/account/account.model';
import { AccountModule } from 'src/account/account.module';
import { Role } from 'src/role/role.model';
import { RoleModule } from 'src/role/role.module';
import { PermissionController } from './permission.controller';
import { Permission } from './permission.model';
import { PermissionService } from './permission.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  imports: [
    SequelizeModule.forFeature([Permission, Role, Account]),
    AccountModule,
    RoleModule,
  ],
})
export class PermissionModule {}
