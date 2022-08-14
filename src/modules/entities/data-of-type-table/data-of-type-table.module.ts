import { Module } from '@nestjs/common';
import { DataOfTypeTableService } from './data-of-type-table.service';
import { DataOfTypeTableController } from './data-of-type-table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DataOfTypeTable } from './entities/data-of-type-table.entity';

@Module({
  controllers: [DataOfTypeTableController],
  providers: [DataOfTypeTableService],
  imports: [SequelizeModule.forFeature([DataOfTypeTable])],
  exports: [DataOfTypeTableService],
})
export class DataOfTypeTableModule {}
