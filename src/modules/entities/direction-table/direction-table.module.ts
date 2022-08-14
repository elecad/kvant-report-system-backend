import { Module } from '@nestjs/common';
import { DirectionTableService } from './direction-table.service';
import { DirectionTableController } from './direction-table.controller';
import { DirectionTable } from './entities/direction-table.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [DirectionTableController],
  providers: [DirectionTableService],
  imports: [SequelizeModule.forFeature([DirectionTable])],
  exports: [DirectionTableService],
})
export class DirectionTableModule {}
