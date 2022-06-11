import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountController } from './account.controller';
import { Account } from './account.model';
import { AccountService } from './account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [SequelizeModule.forFeature([Account])],
})
export class AccountModule {}
