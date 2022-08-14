import { Module } from '@nestjs/common';
import { SessionTableService } from './session-table.service';
import { SessionTableController } from './session-table.controller';

@Module({
  controllers: [SessionTableController],
  providers: [SessionTableService]
})
export class SessionTableModule {}
