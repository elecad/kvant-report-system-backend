import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ProgrammController } from './programm.controller';
import { Programm } from './programm.model';
import { ProgrammService } from './programm.service';

@Module({
  controllers: [ProgrammController],
  providers: [ProgrammService],
  imports: [SequelizeModule.forFeature([Programm]), AuthModule],
  exports: [ProgrammService],
})
export class ProgrammModule {}
