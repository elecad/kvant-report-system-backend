import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './entities/account.entity';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [SequelizeModule.forFeature([Account])],
})
export class AccountModule {}
