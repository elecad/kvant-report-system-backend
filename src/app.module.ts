import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountTableModule } from './modules/entities/account-table/account-table.module';
import { AccountTable } from './modules/entities/account-table/entities/account-table.entity';
import { DependencyTypeTableModule } from './modules/entities/dependency-type-table/dependency-type-table.module';
import { DependencyTypeTable } from './modules/entities/dependency-type-table/entities/dependency-type-table.entity';
import { RoleTable } from './modules/entities/role-table/entities/role-table.entity';
import { RoleTableModule } from './modules/entities/role-table/role-table.module';
import { SessionTable } from './modules/entities/session-table/entities/session-table.entity';
import { SessionTableModule } from './modules/entities/session-table/session-table.module';
import { DependencyTableModule } from './modules/entities/dependency-table/dependency-table.module';
import { DependencyTable } from './modules/entities/dependency-table/entities/dependency-table.entity';
import { Account_DependencyTable } from './modules/entities/account-table/entities/account_dependency-table.entity';
import { Account_RoleTable } from './modules/entities/account-table/entities/account_role-table.entity';
import { EventTableModule } from './modules/entities/event-table/event-table.module';
import { EventTable } from './modules/entities/event-table/entities/event-table.entity';
import { SchoolTypeTableModule } from './modules/entities/school-type-table/school-type-table.module';
import { SchoolTypeTable } from './modules/entities/school-type-table/entities/school-type-table.entity';
import { SchoolTableModule } from './modules/entities/school-table/school-table.module';
import { SchoolTable } from './modules/entities/school-table/entities/school-table.entity';
import { DirectionTableModule } from './modules/entities/direction-table/direction-table.module';
import { DirectionTable } from './modules/entities/direction-table/entities/direction-table.entity';
import { ProgrammTableModule } from './modules/entities/programm-table/programm-table.module';
import { ProgrammTable } from './modules/entities/programm-table/entities/programm-table.entity';
import { FileTableModule } from './modules/entities/file-table/file-table.module';
import { TaskTableModule } from './modules/entities/task-table/task-table.module';
import { FileTable } from './modules/entities/file-table/entities/file-table.entity';
import { TaskTable } from './modules/entities/task-table/entities/task-table.entity';
import { AnswerTableModule } from './modules/entities/answer-table/answer-table.module';
import { AnswerTable } from './modules/entities/answer-table/entities/answer-table.entity';
import { ReportTemplateTableModule } from './modules/entities/report-template-table/report-template-table.module';
import { ReportTemplateTable } from './modules/entities/report-template-table/entities/report-template-table.entity';

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
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        AccountTable,
        SessionTable,
        RoleTable,
        DependencyTypeTable,
        DependencyTable,
        Account_DependencyTable,
        Account_RoleTable,
        EventTable,
        SchoolTypeTable,
        SchoolTable,
        DirectionTable,
        ProgrammTable,
        FileTable,
        TaskTable,
        AnswerTable,
        ReportTemplateTable,
      ],
      autoLoadModels: true,
    }),
    AccountTableModule,
    SessionTableModule,
    RoleTableModule,
    DependencyTypeTableModule,
    DependencyTableModule,
    EventTableModule,
    SchoolTypeTableModule,
    SchoolTableModule,
    DirectionTableModule,
    ProgrammTableModule,
    FileTableModule,
    TaskTableModule,
    AnswerTableModule,
    ReportTemplateTableModule,
  ],
})
export class AppModule {}
