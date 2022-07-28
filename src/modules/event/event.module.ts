import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { DependencyModule } from '../dependency/dependency.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './entities/event.entity';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [DependencyModule, SequelizeModule.forFeature([Event])],
})
export class EventModule {}
