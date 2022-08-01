import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth-guard/auth.guard';
import { User } from 'src/guards/auth-guard/decorators/user.decorator';
import { IUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('')
  getProfile(@User() user: IUser) {
    return this.profileService.getProfileInfo(user);
  }

  @Get('tasks')
  getTask(@User() user: IUser) {
    return this.profileService.getTasksByUser(user);
  }

  @Get('task/:id')
  getDependencyTask(
    @User() user: IUser,
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
  ) {
    return this.profileService.getDependencyByTaskId(id, user);
  }
}
