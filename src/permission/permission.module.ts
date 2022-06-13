import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from 'src/account/account.model';
import { Role } from 'src/role/role.model';
import { PermissionController } from './permission.controller';
import { Permission } from './permission.model';
import { PermissionService } from './permission.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  imports: [SequelizeModule.forFeature([Permission, Role, Account])],
})
export class PermissionModule {}
