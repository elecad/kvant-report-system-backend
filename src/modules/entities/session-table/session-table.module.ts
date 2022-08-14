import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SessionTable } from './entities/session-table.entity';
import { SessionTableController } from './session-table.controller';
import { SessionTableService } from './session-table.service';

@Module({
  controllers: [SessionTableController],
  providers: [SessionTableService],
  imports: [SequelizeModule.forFeature([SessionTable])],
  exports: [SessionTableService],
})
export class SessionTableModule {}
