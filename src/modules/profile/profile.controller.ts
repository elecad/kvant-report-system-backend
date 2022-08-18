import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth-guard/auth.guard';
import { User } from 'src/guards/auth-guard/decorators/user.decorator';
import { AuthUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { AccountService } from '../account/account.service';
import { AccountTableService } from '../entities/account-table/account-table.service';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(
    // private readonly profileService: ProfileService,
    private readonly accountService: AccountService,
  ) {}

  @Get('')
  getProfile(@User() user: AuthUser) {
    return this.accountService.getProfile(user);
  }
}
