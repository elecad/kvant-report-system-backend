import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModule } from './modules/account/account.module';
import { Account } from './modules/account/entities/account.entity';
import { Account_Role } from './modules/account/entities/account_role.entity';
import { Role } from './modules/role/entities/role.entity';
import { RoleModule } from './modules/role/role.module';
import { DependencyTypeModule } from './modules/dependency_type/dependency_type.module';
import { DependencyType } from './modules/dependency_type/entities/dependency_type.entity';
import { DependencyModule } from './modules/dependency/dependency.module';
import { Dependency } from './modules/dependency/entities/dependency.entity';
import { Account_Dependency } from './modules/account/entities/account_dependency.entity';
import { SessionModule } from './modules/session/session.module';
import { Session } from './modules/session/entities/session.entity';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule } from './modules/event/event.module';
import { Event } from './modules/event/entities/event.entity';
import { SchoolTypeModule } from './modules/school_type/school_type.module';
import { SchoolType } from './modules/school_type/entities/school_type.entity';
import { DirectionModule } from './modules/direction/direction.module';

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
        Account,
        Role,
        Account_Role,
        DependencyType,
        Dependency,
        Account_Dependency,
        Session,
        Event,
        SchoolType,
      ],
      autoLoadModels: true,
    }),
    AccountModule,
    RoleModule,
    DependencyTypeModule,
    DependencyModule,
    SessionModule,
    AuthModule,
    EventModule,
    SchoolTypeModule,
    DirectionModule,
  ],
})
export class AppModule {}
