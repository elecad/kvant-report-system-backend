import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { Account } from './account/account.model';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.model';
import { PermissionModule } from './permission/permission.module';
import { Permission } from './permission/permission.model';

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
      models: [Account, Role, Permission],
      autoLoadModels: true,
    }),
    AccountModule,
    RoleModule,
    PermissionModule,
  ],
})
export class AppModule {}
