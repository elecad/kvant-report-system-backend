import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SessionTableModule } from '../entities/session-table/session-table.module';
import { AccountModule } from '../account/account.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [SessionTableModule, AccountModule],
})
export class ProfileModule {}
