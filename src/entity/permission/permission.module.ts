import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Account } from 'src/entity/account/account.model';
import { AccountModule } from 'src/entity/account/account.module';
import { Role } from '../role/role.model';
import { RoleModule } from '../role/role.module';
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
    AuthModule,
  ],
})
export class PermissionModule {}
