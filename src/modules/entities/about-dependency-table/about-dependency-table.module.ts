import { Module } from '@nestjs/common';
import { AboutDependencyTableService } from './about-dependency-table.service';
import { AboutDependencyTableController } from './about-dependency-table.controller';

@Module({
  controllers: [AboutDependencyTableController],
  providers: [AboutDependencyTableService]
})
export class AboutDependencyTableModule {}
