import { Module } from '@nestjs/common';
import { AboutDependencyTableService } from './about-dependency-table.service';
import { AboutDependencyTableController } from './about-dependency-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AboutDependencyTable } from './entities/about-dependency-table.entity';
import { AnswerTableModule } from '../answer-table/answer-table.module';
import { DependencyTableModule } from '../dependency-table/dependency-table.module';
import { DataOfTypeTableModule } from '../data-of-type-table/data-of-type-table.module';

@Module({
  controllers: [AboutDependencyTableController],
  providers: [AboutDependencyTableService],
  imports: [
    SequelizeModule.forFeature([AboutDependencyTable]),
    AnswerTableModule,
    DependencyTableModule,
    DataOfTypeTableModule,
  ],
  exports: [AboutDependencyTableService],
})
export class AboutDependencyTableModule {}
