import { Module } from '@nestjs/common';
import { ProgrammService } from './programm.service';
import { ProgrammController } from './programm.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Programm } from './entities/programm.entity';

@Module({
  controllers: [ProgrammController],
  providers: [ProgrammService],
  imports: [SequelizeModule.forFeature([Programm])],
})
export class ProgrammModule {}
