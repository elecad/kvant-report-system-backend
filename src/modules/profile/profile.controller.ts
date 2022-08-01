import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth-guard/auth.guard';
import { User } from 'src/guards/auth-guard/decorators/user.decorator';
import { IUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('')
  getProfile(@User() user: IUser) {
    return this.profileService.getProfileInfo(user);
  }

  @Get('task')
  getTask(@User() user: IUser) {
    return this.profileService.getTasksByUser(user);
  }
}
