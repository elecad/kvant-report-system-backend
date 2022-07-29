import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskModule } from '../task/task.module';
import { File } from './entities/file.entity';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [SequelizeModule.forFeature([File]), TaskModule],
})
export class FileModule {}
