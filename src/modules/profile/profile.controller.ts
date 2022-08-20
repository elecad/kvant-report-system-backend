import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth-guard/auth.guard';
import { User } from 'src/guards/auth-guard/decorators/user.decorator';
import { AuthUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';
import { AccountService } from '../account/account.service';
import { DependencyService } from '../dependency/dependency.service';
import { TaskService } from '../task/task.service';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(
    // private readonly profileService: ProfileService,
    private readonly accountService: AccountService,
    private readonly taskService: TaskService,
    private readonly dependencyService: DependencyService,
  ) {}

  @Get('')
  getProfile(@User() user: AuthUser) {
    return this.accountService.getProfile(user);
  }

  @Get('/tasks')
  getTasks(@User() user: AuthUser) {
    return this.taskService.getTasksByUser(user);
  }

  @Get('/task/:id')
  async getDependencyByTask(
    @Param('id', new ParseIntPipe(parseIntOptions)) task_id: number,
    @User() user: AuthUser,
  ) {
    const task = await this.taskService.getTaskByIdAndUser(task_id, user);
    return this.dependencyService.getByTask(task, user);
  }
}
