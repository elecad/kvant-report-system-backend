import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RoleController } from './role.controller';
import { Role } from './role.model';
import { RoleService } from './role.service';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [SequelizeModule.forFeature([Role]), AuthModule],
  exports: [RoleService],
})
export class RoleModule {}
