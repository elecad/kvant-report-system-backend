import { Module } from '@nestjs/common';
import { FileTableService } from './file-table.service';
import { FileTableController } from './file-table.controller';

@Module({
  controllers: [FileTableController],
  providers: [FileTableService]
})
export class FileTableModule {}
