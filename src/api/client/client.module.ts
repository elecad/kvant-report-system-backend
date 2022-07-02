import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AnswerModule } from 'src/entity/answer/answer.module';
import { DataTypesModule } from 'src/entity/data_types/data_types.module';
import { PlaceModule } from 'src/entity/place/place.module';
import { PlaceDataModule } from 'src/entity/place_data/place_data.module';
import { ProgrammModule } from 'src/entity/programm/programm.module';
import { ProgrammDataModule } from 'src/entity/programm_data/programm_data.module';
import { TaskModule } from 'src/entity/task/task.module';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [
    AuthModule,
    TaskModule,
    AnswerModule,
    PlaceDataModule,
    ProgrammDataModule,
    DataTypesModule,
    ProgrammModule,
    PlaceModule,
  ],
})
export class ClientModule {}
