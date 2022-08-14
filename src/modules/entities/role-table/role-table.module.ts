import { Module } from '@nestjs/common';
import { RoleTableService } from './role-table.service';
import { RoleTableController } from './role-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleTable } from './entities/role-table.entity';

@Module({
  controllers: [RoleTableController],
  providers: [RoleTableService],
  imports: [SequelizeModule.forFeature([RoleTable])],
  exports: [RoleTableService],
})
export class RoleTableModule {}
