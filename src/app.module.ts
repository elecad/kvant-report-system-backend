import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModule } from './entity/account/account.module';
import { ConfigModule } from '@nestjs/config';
import { Account } from './entity/account/account.model';
import { Role } from './entity/role/role.model';
import { Permission } from './entity/permission/permission.model';
import { Place } from './entity/place/place.model';
import { SchoolType } from './entity/school_type/school_type.model';
import { Direction } from './entity/direction/direction.model';
import { DataTypes } from './entity/data_types/data_types.model';
import { RoleModule } from './entity/role/role.module';
import { PermissionModule } from './entity/permission/permission.module';
import { PlaceModule } from './entity/place/place.module';
import { SchoolTypeModule } from './entity/school_type/school_type.module';
import { DirectionModule } from './entity/direction/direction.module';
import { DataTypesModule } from './entity/data_types/data_types.module';
import { EventModule } from './entity/event/event.module';
import { Event } from './entity/event/event.model';
import { ControlModule } from './entity/control/control.module';
import { Control } from './entity/control/control.model';
import { ProgrammModule } from './entity/programm/programm.module';
import { Programm } from './entity/programm/programm.model';
import { TaskModule } from './entity/task/task.module';
import { PlaceTypeModule } from './entity/place_type/place_type.module';
import { PlaceType } from './entity/place_type/place_type.model';
import { PlaceDataModule } from './entity/place_data/place_data.module';
import { PlaceData } from './entity/place_data/place_data.model';
import { Task } from './entity/task/task.model';
import { ProgrammDataModule } from './entity/programm_data/programm_data.module';
import { ProgrammData } from './entity/programm_data/programm_data.model';
import { AuthModule } from './auth/auth.module';
import { AnswerModule } from './entity/answer/answer.module';
import { Answer } from './entity/answer/answer.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        Account,
        Role,
        Permission,
        Place,
        SchoolType,
        Direction,
        DataTypes,
        Event,
        Control,
        Programm,
        PlaceType,
        Task,
        PlaceData,
        ProgrammData,
        Answer,
      ],
      autoLoadModels: true,
    }),
    AccountModule,
    RoleModule,
    PermissionModule,
    PlaceModule,
    SchoolTypeModule,
    DirectionModule,
    DataTypesModule,
    EventModule,
    ControlModule,
    ProgrammModule,
    TaskModule,
    PlaceTypeModule,
    PlaceDataModule,
    ProgrammDataModule,
    AuthModule,
    AnswerModule,
  ],
})
export class AppModule {}
