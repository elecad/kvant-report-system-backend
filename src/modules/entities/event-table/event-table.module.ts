import { Module } from '@nestjs/common';
import { EventTableService } from './event-table.service';
import { EventTableController } from './event-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventTable } from './entities/event-table.entity';

@Module({
  controllers: [EventTableController],
  providers: [EventTableService],
  imports: [SequelizeModule.forFeature([EventTable])],
})
export class EventTableModule {}
