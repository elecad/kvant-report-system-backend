import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './entities/account.entity';
import { RoleModule } from '../role/role.module';
import { DependencyModule } from '../dependency/dependency.module';
import { SessionModule } from '../session/session.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [
    DependencyModule,
    SessionModule,
    RoleModule,
    SequelizeModule.forFeature([Account]),
  ],
  exports: [AccountService],
})
export class AccountModule {}
