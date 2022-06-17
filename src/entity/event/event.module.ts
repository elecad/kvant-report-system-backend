import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './event.model';

@Module({
  providers: [EventService],
  controllers: [EventController],
  imports: [SequelizeModule.forFeature([Event])],
})
export class EventModule {}
