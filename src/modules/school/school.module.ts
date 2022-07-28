import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DependencyModule } from '../dependency/dependency.module';
import { SchoolTypeModule } from '../school_type/school_type.module';
import { School } from './entities/school.entity';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';

@Module({
  controllers: [SchoolController],
  providers: [SchoolService],
  imports: [
    SequelizeModule.forFeature([School]),
    DependencyModule,
    SchoolTypeModule,
  ],
  exports: [SchoolService],
})
export class SchoolModule {}
