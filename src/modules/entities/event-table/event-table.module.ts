import { Module } from '@nestjs/common';
import { EventTableService } from './event-table.service';
import { EventTableController } from './event-table.controller';

@Module({
  controllers: [EventTableController],
  providers: [EventTableService]
})
export class EventTableModule {}
