import { Module } from '@nestjs/common';
import { FileTableService } from './file-table.service';
import { FileTableController } from './file-table.controller';
import { FileTable } from './entities/file-table.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskTableModule } from '../task-table/task-table.module';

@Module({
  controllers: [FileTableController],
  providers: [FileTableService],
  imports: [SequelizeModule.forFeature([FileTable]), TaskTableModule],
  exports: [FileTableService],
})
export class FileTableModule {}
