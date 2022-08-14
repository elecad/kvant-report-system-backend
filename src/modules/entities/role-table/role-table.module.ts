import { Module } from '@nestjs/common';
import { RoleTableService } from './role-table.service';
import { RoleTableController } from './role-table.controller';

@Module({
  controllers: [RoleTableController],
  providers: [RoleTableService]
})
export class RoleTableModule {}
