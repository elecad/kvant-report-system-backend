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
      ],
      autoLoadModels: true,
    }),
    AccountTableModule,
    SessionTableModule,
    RoleTableModule,
    DependencyTypeTableModule,
    DependencyTableModule,
  ],
})
export class AppModule {}
