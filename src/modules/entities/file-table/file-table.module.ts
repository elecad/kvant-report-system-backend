import { Module } from '@nestjs/common';
import { FileTableService } from './file-table.service';
import { FileTableController } from './file-table.controller';
import { FileTable } from './entities/file-table.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [FileTableController],
  providers: [FileTableService],
  imports: [SequelizeModule.forFeature([FileTable])],
  exports: [FileTableService],
})
export class FileTableModule {}
