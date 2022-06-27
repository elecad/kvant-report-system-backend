import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AnswerModule } from 'src/entity/answer/answer.module';
import { TaskModule } from 'src/entity/task/task.module';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [AuthModule, TaskModule, AnswerModule],
})
export class ClientModule {}
