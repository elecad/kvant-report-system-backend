import { Module } from '@nestjs/common';
import { DependencyTypeTableService } from './dependency-type-table.service';
import { DependencyTypeTableController } from './dependency-type-table.controller';

@Module({
  controllers: [DependencyTypeTableController],
  providers: [DependencyTypeTableService]
})
export class DependencyTypeTableModule {}
