import { Module } from '@nestjs/common';
import { SchoolTypeService } from './school_type.service';
import { SchoolTypeController } from './school_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SchoolType } from './school_type.model';

@Module({
  providers: [SchoolTypeService],
  controllers: [SchoolTypeController],
  imports: [SequelizeModule.forFeature([SchoolType])],
})
export class SchoolTypeModule {}
