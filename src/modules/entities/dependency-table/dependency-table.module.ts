import { Module } from '@nestjs/common';
import { DependencyTableService } from './dependency-table.service';
import { DependencyTableController } from './dependency-table.controller';

@Module({
  controllers: [DependencyTableController],
  providers: [DependencyTableService]
})
export class DependencyTableModule {}
