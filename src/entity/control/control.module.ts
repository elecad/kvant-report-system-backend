import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { ControlController } from './control.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Control } from './control.model';
import { AccountModule } from '../account/account.module';
import { PlaceModule } from '../place/place.module';
import { Place } from '../place/place.model';
import { Account } from '../account/account.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ControlService],
  controllers: [ControlController],
  imports: [
    SequelizeModule.forFeature([Control, Place, Account]),
    AuthModule,
    AccountModule,
    PlaceModule,
  ],
})
export class ControlModule {}
