import { Module } from '@nestjs/common';
import { SchoolTypeService } from './school_type.service';
import { SchoolTypeController } from './school_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SchoolType } from './school_type.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [SchoolTypeService],
  controllers: [SchoolTypeController],
  imports: [SequelizeModule.forFeature([SchoolType]), AuthModule],
})
export class SchoolTypeModule {}
