import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SessionTableModule } from '../entities/session-table/session-table.module';
import { AccountTableModule } from '../entities/account-table/account-table.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [SessionTableModule],
})
export class ProfileModule {}
