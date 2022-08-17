import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountTableModule } from '../entities/account-table/account-table.module';
import { RoleTableService } from '../entities/role-table/role-table.service';
import { RoleTableModule } from '../entities/role-table/role-table.module';
import { DependencyTableModule } from '../entities/dependency-table/dependency-table.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [AccountTableModule, RoleTableModule, DependencyTableModule],
})
export class AccountModule {}
