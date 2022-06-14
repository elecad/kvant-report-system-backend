import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { Account } from './account/account.model';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.model';
import { PermissionModule } from './permission/permission.module';
import { Permission } from './permission/permission.model';
import { PlaceModule } from './place/place.module';
import { Place } from './place/place.model';
import { SchoolTypeModule } from './school_type/school_type.module';
import { SchoolType } from './school_type/school_type.model';

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
      models: [Account, Role, Permission, Place, SchoolType],
      autoLoadModels: true,
    }),
    AccountModule,
    RoleModule,
    PermissionModule,
    PlaceModule,
    SchoolTypeModule,
  ],
})
export class AppModule {}
