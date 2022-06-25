import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './event.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [EventService],
  controllers: [EventController],
  imports: [SequelizeModule.forFeature([Event]), AuthModule],
})
export class EventModule {}
