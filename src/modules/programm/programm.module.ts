import { forwardRef, Module } from '@nestjs/common';
import { ProgrammService } from './programm.service';
import { ProgrammController } from './programm.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Programm } from './entities/programm.entity';
import { SchoolModule } from '../school/school.module';
import { DirectionModule } from '../direction/direction.module';
import { DependencyModule } from '../dependency/dependency.module';

@Module({
  controllers: [ProgrammController],
  providers: [ProgrammService],
  imports: [
    SequelizeModule.forFeature([Programm]),
    SchoolModule,
    DirectionModule,
    DependencyModule,
  ],
  exports: [ProgrammService],
})
export class ProgrammModule {}
