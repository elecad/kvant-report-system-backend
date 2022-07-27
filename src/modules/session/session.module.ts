import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from './entities/session.entity';
import { SessionService } from './session.service';

@Module({
  providers: [SessionService],
  imports: [SequelizeModule.forFeature([Session])],
})
export class SessionModule {}
