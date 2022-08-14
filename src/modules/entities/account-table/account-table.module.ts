import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountTableController } from './account-table.controller';
import { AccountTableService } from './account-table.service';
import { AccountTable } from './entities/account-table.entity';

@Module({
  controllers: [AccountTableController],
  providers: [AccountTableService],
  imports: [SequelizeModule.forFeature([AccountTable])],
  exports: [AccountTableService],
})
export class AccountTableModule {}
