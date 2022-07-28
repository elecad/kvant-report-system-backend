import { Module } from '@nestjs/common';
import { SchoolTypeService } from './school_type.service';
import { SchoolTypeController } from './school_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SchoolType } from './entities/school_type.entity';

@Module({
  controllers: [SchoolTypeController],
  providers: [SchoolTypeService],
  imports: [SequelizeModule.forFeature([SchoolType])],
  exports: [SchoolTypeService],
})
export class SchoolTypeModule {}
